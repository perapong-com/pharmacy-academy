import Link from 'next/link';
import React from 'react';

const PaymentFailArea = () => {
    return (
        <section className="payment-result-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="result-wrapper text-center" style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '60px 40px',
                            boxShadow: '0 10px 40px rgba(0, 71, 54, 0.1)'
                        }}>
                            <div className="fail-icon" style={{
                                width: '100px',
                                height: '100px',
                                background: '#FFE8E8',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 30px'
                            }}>
                                <i className="fas fa-times" style={{ fontSize: '50px', color: '#AD0119' }}></i>
                            </div>

                            <h2 style={{ color: '#AD0119', marginBottom: '15px' }}>การชำระเงินไม่สำเร็จ</h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                เกิดข้อผิดพลาดระหว่างการชำระเงิน กรุณาลองใหม่อีกครั้ง
                            </p>

                            <div className="error-details" style={{
                                background: '#FFF5F5',
                                borderRadius: '15px',
                                padding: '20px',
                                marginBottom: '30px',
                                border: '1px solid #FFE0E0'
                            }}>
                                <p style={{ color: '#AD0119', marginBottom: '0' }}>
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    บัตรถูกปฏิเสธ กรุณาตรวจสอบข้อมูลบัตรหรือลองใช้บัตรใบอื่น
                                </p>
                            </div>

                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <Link href="/checkout" className="theme-btn">
                                    ลองใหม่อีกครั้ง
                                </Link>
                                <Link href="/payment-qr" className="theme-btn" style={{
                                    background: 'transparent',
                                    border: '2px solid #004736',
                                    color: '#004736'
                                }}>
                                    ชำระผ่าน QR Code
                                </Link>
                            </div>

                            <div className="mt-4">
                                <Link href="/shop-cart" style={{ color: '#666' }}>
                                    <i className="fas fa-arrow-left me-2"></i>
                                    กลับไปตะกร้าสินค้า
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentFailArea;
