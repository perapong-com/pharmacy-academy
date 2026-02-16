"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/features/auth";

import AuthLayout from "./AuthLayout";
import { useLanguage } from '@/features/i18n';

const SignInArea: React.FC = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoginFailed(false);
        setFieldErrors({});

        // Validation
        const newFieldErrors: Record<string, string> = {};
        if (!email.trim()) {
            newFieldErrors.email = t('กรุณากรอกอีเมล', 'Please enter your email');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newFieldErrors.email = t('รูปแบบอีเมลไม่ถูกต้อง', 'Invalid email format');
        }

        if (!password) {
            newFieldErrors.password = t('กรุณากรอกรหัสผ่าน', 'Please enter your password');
        }

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setLoginFailed(true);
            setIsSubmitting(false);
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            // Check if there's a redirect URL stored
            const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                sessionStorage.removeItem("redirectAfterLogin");
                router.push(redirectUrl);
            } else {
                router.push("/");
            }
        } else {
            setLoginFailed(true);
            const errorMsg = (result.error || '').toLowerCase();
            
            // Handle User Not Found specifically
            if (errorMsg.includes('not found') || errorMsg.includes('user not found')) {
                setFieldErrors({
                    email: t('ไม่พบบัญชีนี้อยู่ในระบบ', 'Account not found in system')
                });
            } else if (errorMsg.includes('email') || errorMsg.includes('user') || errorMsg.includes('อีเมล')) {
                setFieldErrors({
                    email: t('อีเมลไม่ถูกต้อง', 'Invalid email')
                });
            } else {
                setFieldErrors({
                    password: t('รหัสผ่านไม่ถูกต้อง', 'Incorrect password')
                });
            }
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google login");
        router.push("/");
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 className="text-resp-h1" style={{
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '8px',
                }}>
                    {t('เข้าสู่ระบบ', 'Login')}
                </h1>
                <p className="text-resp-body-lg" style={{
                    color: '#6B7280',
                }}>
                    {t('กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ', 'Please login to your account first')}
                </p>
            </div>



            <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div style={{ marginBottom: '18px' }}>
                    {loginFailed && (
                        <div style={{ color: '#DC2626', fontSize: '22px', marginBottom: '12px', fontWeight: '500' }}>
                            {t('เข้าสู่ระบบล้มเหลว', 'Login Failed')}
                        </div>
                    )}
                    <label className="text-resp-body-lg" style={{
                        display: 'block',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        color: '#374151',
                    }}>
                        {t('อีเมล', 'Email')}
                    </label>
                    <input
                        type="email"
                        placeholder={t('กรอกอีเมลของคุณ', 'Enter your email')}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setLoginFailed(false);
                            if (fieldErrors.email) setFieldErrors(prev => {
                                const next = { ...prev };
                                delete next.email;
                                return next;
                            });
                        }}
                        required
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: fieldErrors.email ? '1px solid #DC2626' : '1px solid #D1D5DB',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            backgroundColor: '#F9FAFB',
                            color: '#111827',
                        }}
                        className="text-resp-body-lg"
                        onFocus={(e) => {
                            if (!fieldErrors.email) {
                                e.target.style.borderColor = '#014D40';
                                e.target.style.boxShadow = '0 0 0 3px rgba(1, 77, 64, 0.1)';
                            } else {
                                e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                            }
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = fieldErrors.email ? '#DC2626' : '#D1D5DB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    {fieldErrors.email && (
                        <span style={{ color: '#DC2626', fontSize: '22px', marginTop: '6px', display: 'block' }}>
                            {fieldErrors.email}
                        </span>
                    )}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="text-resp-body-lg" style={{
                        display: 'block',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        color: '#374151',
                    }}>
                        {t('รหัสผ่าน', 'Password')}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t('กรอกรหัสผ่านของคุณ', 'Enter your password')}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setLoginFailed(false);
                                if (fieldErrors.password) setFieldErrors(prev => {
                                    const next = { ...prev };
                                    delete next.password;
                                    return next;
                                });
                            }}
                            required
                            style={{
                                width: '100%',
                                padding: '16px 50px 16px 20px',
                                borderRadius: '12px',
                                border: fieldErrors.password ? '1px solid #DC2626' : '1px solid #D1D5DB',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                backgroundColor: '#F9FAFB',
                                color: '#111827',
                            }}
                            className="text-resp-body-lg"
                            onFocus={(e) => {
                                if (!fieldErrors.password) {
                                    e.target.style.borderColor = '#014D40';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(1, 77, 64, 0.1)';
                                } else {
                                    e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                                }
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = fieldErrors.password ? '#DC2626' : '#D1D5DB';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {showPassword ? (
                                <EyeOff style={{ width: '18px', height: '18px', color: '#6B7280' }} />
                            ) : (
                                <Eye style={{ width: '18px', height: '18px', color: '#6B7280' }} />
                            )}
                        </button>
                    </div>
                    {fieldErrors.password && (
                        <span style={{ color: '#DC2626', fontSize: '22px', marginTop: '6px', display: 'block' }}>
                            {fieldErrors.password}
                        </span>
                    )}
                </div>

                {/* Forgot Password */}
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <Link
                        href="#"
                        className="text-resp-link"
                        style={{
                            color: '#014D40',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}
                    >
                        {t('ลืมรหัสผ่าน?', 'Forgot Password?')}
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#014D40',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                        marginBottom: '24px',
                    }}
                    className="text-resp-btn"
                >
                    {isSubmitting ? t('กำลังเข้าสู่ระบบ...', 'Logging in...') : t('เข้าสู่ระบบ', 'Login')}
                </button>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                    <span className="text-resp-info" style={{ color: '#9CA3AF' }}>{t('หรือเข้าสู่ระบบด้วย Google', 'Or login with Google')}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="text-resp-btn"
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: '#ffffff',
                        color: '#374151',
                        border: '1px solid #D1D5DB',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </button>
            </form>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p className="text-resp-body" style={{ color: '#6B7280' }}>
                    {t('ยังไม่มีบัญชี?', "Don't have an account?")}{" "}
                    <Link
                        href="/register"
                        className="text-resp-link"
                        style={{
                            color: '#014D40',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                    >
                        {t('สมัครสมาชิก', 'Sign Up here')}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignInArea;
