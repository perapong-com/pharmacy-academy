"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import AuthLayout from "./AuthLayout";

const SignInArea: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

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
            setError(result.error || "เข้าสู่ระบบไม่สำเร็จ");
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
                <h1 style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '6px',
                }}>
                    Login
                </h1>
                <p style={{
                    color: '#6B7280',
                    fontSize: '14px',
                }}>
                    Please login to your account first
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '8px',
                    marginBottom: '18px',
                    color: '#DC2626',
                    fontSize: '14px',
                }}>
                    <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                    {error}
                </div>
            )}

            {/* Demo Credentials */}
            <div style={{
                padding: '12px 16px',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '8px',
                marginBottom: '18px',
                fontSize: '13px',
            }}>
                <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '6px' }}></i>
                    Demo Account:
                </p>
                <p style={{ margin: '4px 0 0', color: '#166534' }}>
                    Email: <strong>andrew.johnson@gmail.com</strong><br />
                    Password: <strong>123456</strong>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div style={{ marginBottom: '18px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontWeight: '500',
                        color: '#374151',
                        fontSize: '14px',
                    }}>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            backgroundColor: '#F9FAFB',
                            color: '#111827',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#014D40';
                            e.target.style.boxShadow = '0 0 0 3px rgba(1, 77, 64, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#D1D5DB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontWeight: '500',
                        color: '#374151',
                        fontSize: '14px',
                    }}>
                        Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 44px 12px 14px',
                                borderRadius: '8px',
                                border: '1px solid #D1D5DB',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                backgroundColor: '#F9FAFB',
                                color: '#111827',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#014D40';
                                e.target.style.boxShadow = '0 0 0 3px rgba(1, 77, 64, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#D1D5DB';
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
                </div>

                {/* Forgot Password */}
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <Link
                        href="#"
                        style={{
                            color: '#014D40',
                            fontSize: '13px',
                            fontWeight: '500',
                            textDecoration: 'none',
                        }}
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#014D40',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                        marginBottom: '20px',
                    }}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Or login with Google</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        color: '#374151',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
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
                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        style={{
                            color: '#014D40',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}
                    >
                        Sign Up here
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignInArea;
