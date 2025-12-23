"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const RegisterPharmacistArea = () => {
    const [formData, setFormData] = useState({
        name: '',
        licenseNumber: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register Pharmacist:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="register-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="register-wrapper" style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '50px 40px',
                            boxShadow: '0 10px 40px rgba(0, 71, 54, 0.1)'
                        }}>
                            <div className="text-center mb-4">
                                <h2 style={{ color: '#004736', marginBottom: '10px' }}>ลงทะเบียนเภสัชกร</h2>
                                <p style={{ color: '#666' }}>สำหรับเภสัชกรที่ต้องการสะสมหน่วยกิต CPE</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        ชื่อ-นามสกุล
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="กรอกชื่อ-นามสกุล"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        เลขที่ใบอนุญาตประกอบวิชาชีพ
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        className="form-control"
                                        placeholder="กรอกเลขที่ใบอนุญาต ภ."
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        อีเมล
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="กรอกอีเมลของคุณ"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        เบอร์โทรศัพท์
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="กรอกเบอร์โทรศัพท์"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        รหัสผ่าน
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="สร้างรหัสผ่าน"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" style={{ color: '#004736', fontWeight: '500' }}>
                                        ยืนยันรหัสผ่าน
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        style={{
                                            padding: '15px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid #e0e0e0'
                                        }}
                                        required
                                    />
                                </div>

                                <div className="form-check mb-4">
                                    <input type="checkbox" className="form-check-input" id="terms" required />
                                    <label className="form-check-label" htmlFor="terms" style={{ color: '#666' }}>
                                        ยอมรับ <Link href="#" style={{ color: '#004736' }}>เงื่อนไขการใช้งาน</Link> และยินยอมให้ตรวจสอบข้อมูลใบอนุญาต
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="theme-btn w-100"
                                    style={{
                                        padding: '15px',
                                        borderRadius: '10px',
                                        fontSize: '16px'
                                    }}
                                >
                                    ลงทะเบียนเภสัชกร
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <p style={{ color: '#666' }}>
                                    มีบัญชีอยู่แล้ว? {' '}
                                    <Link href="/sign-in" style={{ color: '#004736', fontWeight: '600' }}>
                                        เข้าสู่ระบบ
                                    </Link>
                                </p>
                            </div>

                            <div className="text-center mt-3">
                                <p style={{ color: '#666', fontSize: '14px' }}>
                                    ไม่ใช่เภสัชกร? {' '}
                                    <Link href="/register" style={{ color: '#004736', fontWeight: '600' }}>
                                        สมัครสมาชิกทั่วไป
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPharmacistArea;
