"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "./AuthLayout";

const RegisterArea: React.FC = () => {
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
        padding: '11px 14px',
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        backgroundColor: '#F9FAFB',
        color: '#111827',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
        color: '#374151',
        fontSize: '13px',
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
                <h1 style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '6px',
                }}>
                    Sign Up
                </h1>
                <p style={{
                    color: '#6B7280',
                    fontSize: '14px',
                }}>
                    Please login to your account first
                </p>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0',
                marginBottom: '22px',
                backgroundColor: '#F3F4F6',
                borderRadius: '10px',
                padding: '4px',
            }}>
                <button
                    type="button"
                    onClick={() => setActiveTab("general")}
                    style={{
                        flex: 1,
                        padding: '11px 14px',
                        backgroundColor: activeTab === "general" ? '#014D40' : 'transparent',
                        color: activeTab === "general" ? '#ffffff' : '#6B7280',
                        border: 'none',
                        borderRadius: '7px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                >
                    ลงทะเบียนสำหรับบุคคลทั่วไป
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("pharmacist")}
                    style={{
                        flex: 1,
                        padding: '11px 14px',
                        backgroundColor: activeTab === "pharmacist" ? '#014D40' : 'transparent',
                        color: activeTab === "pharmacist" ? '#ffffff' : '#6B7280',
                        border: 'none',
                        borderRadius: '7px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                >
                    ลงทะเบียนสำหรับเภสัชกร
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Name Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                        <label style={labelStyle}>Name</label>
                        <input
                            type="text"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Last Name</label>
                        <input
                            type="text"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Password Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                        <label style={labelStyle}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                required
                                style={{ ...inputStyle, paddingRight: '40px' }}
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
                    <div>
                        <label style={labelStyle}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                required
                                style={{ ...inputStyle, paddingRight: '40px' }}
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
                </div>

                {/* Phone Number */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Pharmacist-only Fields */}
                {activeTab === "pharmacist" && (
                    <>
                        <div style={{ marginBottom: '14px' }}>
                            <label style={labelStyle}>Professional License Number</label>
                            <input
                                type="text"
                                placeholder="เลขที่ใบอนุญาตประกอบวิชาชีพ (ภ.)"
                                value={formData.licenseNumber}
                                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                                required
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div style={{ marginBottom: '14px' }}>
                            <label style={labelStyle}>Pharmacy / Healthcare Facility Name</label>
                            <input
                                type="text"
                                placeholder="ชื่อร้านยา / สถานพยาบาล"
                                value={formData.facilityName}
                                onChange={(e) => handleInputChange('facilityName', e.target.value)}
                                required
                                style={inputStyle}
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
                        padding: '12px',
                        marginTop: '6px',
                        backgroundColor: '#014D40',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                    }}
                >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            {/* Login Link */}
            <div style={{ textAlign: 'center', marginTop: '22px' }}>
                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        style={{
                            color: '#014D40',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterArea;