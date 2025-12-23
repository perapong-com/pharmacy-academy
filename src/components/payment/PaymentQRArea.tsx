"use client";

import Link from 'next/link';
import React from 'react';

const PaymentQRArea = () => {
    return (
        <section className="payment-qr-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="qr-wrapper text-center" style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '50px 40px',
                            boxShadow: '0 10px 40px rgba(0, 71, 54, 0.1)'
                        }}>
                            <h3 style={{ color: '#004736', marginBottom: '10px' }}>ชำระเงินผ่าน QR Code</h3>
                            <p style={{ color: '#666', marginBottom: '30px' }}>สแกน QR Code เพื่อชำระเงิน</p>

                            <div className="qr-code-box" style={{
                                background: '#f8f9fa',
                                borderRadius: '15px',
                                padding: '30px',
                                marginBottom: '30px'
                            }}>
                                {/* QR Code placeholder */}
                                <div style={{
                                    width: '200px',
                                    height: '200px',
                                    background: '#fff',
                                    border: '2px solid #004736',
                                    borderRadius: '10px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <i className="fas fa-qrcode" style={{ fontSize: '80px', color: '#004736' }}></i>
                                        <p style={{ marginTop: '10px', color: '#666', fontSize: '12px' }}>PromptPay QR</p>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-info" style={{
                                background: '#E8F8F4',
                                borderRadius: '10px',
                                padding: '20px',
                                marginBottom: '30px'
                            }}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ color: '#666' }}>ยอดชำระ</span>
                                    <strong style={{ color: '#004736', fontSize: '24px' }}>฿1,500</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span style={{ color: '#666' }}>รหัสอ้างอิง</span>
                                    <span style={{ color: '#004736' }}>PA-2024-001234</span>
                                </div>
                            </div>

                            <div className="timer" style={{ marginBottom: '20px' }}>
                                <p style={{ color: '#666' }}>QR Code จะหมดอายุใน</p>
                                <h4 style={{ color: '#AD0119' }}>14:59</h4>
                            </div>

                            <Link
                                href="/payment-success"
                                className="theme-btn w-100"
                                style={{
                                    padding: '15px',
                                    borderRadius: '10px',
                                    fontSize: '16px'
                                }}
                            >
                                ฉันชำระเงินแล้ว
                            </Link>

                            <div className="mt-4">
                                <Link href="/checkout" style={{ color: '#004736' }}>
                                    <i className="fas fa-credit-card me-2"></i>
                                    ชำระด้วยบัตรเครดิตแทน
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentQRArea;
