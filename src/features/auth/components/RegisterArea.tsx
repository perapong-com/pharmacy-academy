"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "./AuthLayout";
import { useLanguage } from '@/features/i18n';

const RegisterArea: React.FC = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"general" | "pharmacist">("general");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        licenseNumber: "",
        facilityName: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Registration:", { tab: activeTab, ...formData });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/");
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '16px 20px',
        borderRadius: '12px',
        border: '1px solid #D1D5DB',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        backgroundColor: '#F9FAFB',
        color: '#111827',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#374151',
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = '#014D40';
        e.target.style.boxShadow = '0 0 0 3px rgba(1, 77, 64, 0.1)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = '#D1D5DB';
        e.target.style.boxShadow = 'none';
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div style={{ marginBottom: '22px' }}>
                <h1 className="text-resp-h1" style={{
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '8px',
                }}>
                    {t('สมัครสมาชิก', 'Sign Up')}
                </h1>
                <p className="text-resp-body-lg" style={{
                    color: '#6B7280',
                }}>
                    {t('กรอกข้อมูลเพื่อสร้างบัญชีใหม่', 'Fill in your details to create an account')}
                </p>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '22px',
                backgroundColor: '#F3F4F6',
                borderRadius: '10px',
                padding: '4px',
                width: '100%',
            }}>
                <button
                    type="button"
                    onClick={() => setActiveTab("general")}
                    style={{
                        flex: 1,
                        padding: '12px 8px',
                        backgroundColor: activeTab === "general" ? '#014D40' : 'transparent',
                        color: activeTab === "general" ? '#ffffff' : '#6B7280',
                        border: 'none',
                        borderRadius: '7px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                    }}
                    className="text-resp-btn"
                >
                    {t('บุคคลทั่วไป', 'General')}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("pharmacist")}
                    style={{
                        flex: 1,
                        padding: '12px 8px',
                        backgroundColor: activeTab === "pharmacist" ? '#014D40' : 'transparent',
                        color: activeTab === "pharmacist" ? '#ffffff' : '#6B7280',
                        border: 'none',
                        borderRadius: '7px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                    }}
                    className="text-resp-btn"
                >
                    {t('เภสัชกร', 'Pharmacist')}
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="text-resp-body-lg" style={labelStyle}>{t('ชื่อ-นามสกุล', 'Name-Last Name')}</label>
                    <input
                        type="text"
                        placeholder={t('ชื่อ-นามสกุล', 'Name-Last Name')}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        style={inputStyle}
                        className="text-resp-body-lg"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="text-resp-body-lg" style={labelStyle}>{t('อีเมล', 'Email')}</label>
                    <input
                        type="email"
                        placeholder={t('กรอกอีเมลของคุณ', 'Enter your email')}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        style={inputStyle}
                        className="text-resp-body-lg"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="text-resp-body-lg" style={labelStyle}>{t('รหัสผ่าน', 'Password')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t('รหัสผ่าน', 'Password')}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                            style={{ ...inputStyle, paddingRight: '60px' }}
                            className="text-resp-body-lg"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                            }}
                        >
                            {showPassword ?
                                <EyeOff style={{ width: '16px', height: '16px', color: '#6B7280' }} /> :
                                <Eye style={{ width: '16px', height: '16px', color: '#6B7280' }} />
                            }
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="text-resp-body-lg" style={labelStyle}>{t('ยืนยันรหัสผ่าน', 'Confirm Password')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t('ยืนยันรหัสผ่าน', 'Confirm password')}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                            style={{ ...inputStyle, paddingRight: '60px' }}
                            className="text-resp-body-lg"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                            }}
                        >
                            {showConfirmPassword ?
                                <EyeOff style={{ width: '16px', height: '16px', color: '#6B7280' }} /> :
                                <Eye style={{ width: '16px', height: '16px', color: '#6B7280' }} />
                            }
                        </button>
                    </div>
                </div>

                {/* Pharmacist-only Fields */}
                {activeTab === "pharmacist" && (
                    <>
                        <div style={{ marginBottom: '14px' }}>
                            <label className="text-resp-body-lg" style={labelStyle}>{t('เลขที่ใบอนุญาตประกอบวิชาชีพ', 'Professional License Number')}</label>
                            <input
                                type="text"
                                placeholder={t('เลขที่ใบอนุญาตประกอบวิชาชีพ (ภ.)', 'Professional license number')}
                                value={formData.licenseNumber}
                                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                                required
                                style={inputStyle}
                                className="text-resp-body-lg"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                    </>
                )}

                {/* Sign Up Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '16px',
                        marginTop: '6px',
                        backgroundColor: '#014D40',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                    }}
                    className="text-resp-btn"
                >
                    {isSubmitting ? t('กำลังสมัครสมาชิก...', 'Signing up...') : t('สมัครสมาชิก', 'Sign Up')}
                </button>
            </form>

            {/* Login Link */}
            <div style={{ textAlign: 'center', marginTop: '22px' }}>
                <p className="text-resp-body" style={{ color: '#6B7280' }}>
                    {t('มีบัญชีอยู่แล้ว?', 'Already have an account?')}{" "}
                    <Link
                        href="/sign-in"
                        style={{
                            color: '#014D40',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                        className="text-resp-link"
                    >
                        {t('เข้าสู่ระบบ', 'Login')}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterArea;