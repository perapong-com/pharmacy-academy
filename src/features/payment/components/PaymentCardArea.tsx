"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PaymentCardArea = () => {
    const { language, t } = useLanguage();
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Format card number with spaces
        if (e.target.name === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (value.length > 19) return;
        }

        // Format expiry date
        if (e.target.name === 'expiry') {
            value = value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            if (value.length > 5) return;
        }

        // Limit CVV
        if (e.target.name === 'cvv') {
            if (value.length > 3) return;
        }

        setCardData({
            ...cardData,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            window.location.href = '/payment-success';
        }, 2000);
    };

    // Sample order data
    const orderItems = [
        { name: 'เภสัชวิทยาคลินิกเบื้องต้น', nameEn: 'Clinical Pharmacology Basics', price: 1500 },
        { name: 'การบริบาลผู้ป่วยเบาหวาน', nameEn: 'Diabetes Patient Care', price: 1800 },
        { name: 'กฎหมายเภสัชกรรม', nameEn: 'Pharmacy Law', price: 1200 },
    ];
    const total = orderItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className="payment-card-section section-padding">
            <div className="container">
                <div className="row g-4">
                    {/* Left: Card Form */}
                    <div className="col-lg-6">
                        <div className="card-form-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '32px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                            <h4 style={{ color: '#014D40', marginBottom: '16px' }}>
                                {t('ชำระเงินด้วยบัตรเครดิต/เดบิต', 'Pay with Credit/Debit Card')}
                            </h4>

                            {/* Countdown Timer */}
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 30px',
                                    background: 'linear-gradient(135deg, #014D40 0%, #014D40 100%)',
                                    color: '#fff',
                                    borderRadius: '30px',
                                    fontWeight: '600',
                                    fontSize: '20px',
                                    boxShadow: '0 4px 15px rgba(1, 77, 64, 0.3)',
                                }}>
                                    <i className="far fa-clock"></i>
                                    {formatTime(timeLeft)}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Card Number */}
                                <div className="mb-4">
                                    <label style={{
                                        color: '#014D40',
                                        fontWeight: '500',
                                        marginBottom: '8px',
                                        display: 'block',
                                        fontSize: '14px'
                                    }}>
                                        {t('หมายเลขบัตร', 'Card Number')}
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardData.cardNumber}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 60px 16px 20px',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                color: '#333',
                                                outline: 'none'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            right: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            display: 'flex',
                                            gap: '4px'
                                        }}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: '20px' }} />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: '20px' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Card Name */}
                                <div className="mb-4">
                                    <label style={{
                                        color: '#014D40',
                                        fontWeight: '500',
                                        marginBottom: '8px',
                                        display: 'block',
                                        fontSize: '14px'
                                    }}>
                                        {t('ชื่อบนบัตร', 'Name on Card')}
                                    </label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        placeholder={t('ชื่อตามที่ปรากฏบนบัตร', 'Name as it appears on card')}
                                        value={cardData.cardName}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            color: '#333',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                {/* Expiry & CVV */}
                                <div className="row">
                                    <div className="col-6 mb-4">
                                        <label style={{
                                            color: '#014D40',
                                            fontWeight: '500',
                                            marginBottom: '8px',
                                            display: 'block',
                                            fontSize: '14px'
                                        }}>
                                            {t('วันหมดอายุ', 'Expiry Date')}
                                        </label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={cardData.expiry}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                color: '#333',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                    <div className="col-6 mb-4">
                                        <label style={{
                                            color: '#014D40',
                                            fontWeight: '500',
                                            marginBottom: '8px',
                                            display: 'block',
                                            fontSize: '14px'
                                        }}>
                                            CVV
                                        </label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            placeholder="123"
                                            value={cardData.cvv}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                color: '#333',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: isProcessing ? '#ccc' : '#014D40',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {isProcessing ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i>
                                            {t('กำลังดำเนินการ...', 'Processing...')}
                                        </>
                                    ) : (
                                        <>{t('ชำระเงิน', 'Pay')} ฿{total.toLocaleString()}</>
                                    )}
                                </button>
                            </form>

                            {/* Alternative Payment */}
                            <div className="text-center mt-4">
                                <a
                                    href="/payment-qr"
                                    style={{
                                        color: '#014D40',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <i className="fas fa-qrcode"></i>
                                    {t('ชำระผ่าน QR Code แทน', 'Pay via QR Code instead')}
                                </a>
                            </div>

                            {/* Security Note */}
                            <div className="mt-4 p-3" style={{
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <i className="fas fa-lock" style={{ color: '#014D40', fontSize: '20px' }}></i>
                                <div>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                                        {t('การชำระเงินของคุณปลอดภัยด้วยการเข้ารหัส SSL 256-bit', 'Your payment is secure with SSL 256-bit encryption')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="col-lg-6">
                        <div className="order-summary-wrapper" style={{
                            background: '#f8f9fa',
                            borderRadius: '16px',
                            padding: '32px'
                        }}>
                            <h5 style={{ color: '#014D40', marginBottom: '20px' }}>{t('สรุปรายการ', 'Order Summary')}</h5>

                            {/* Order Items */}
                            {orderItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-between mb-3 pb-3"
                                    style={{ borderBottom: index < orderItems.length - 1 ? '1px solid #e0e0e0' : 'none' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                                            {language === 'th' ? item.name : item.nameEn}
                                        </p>
                                    </div>
                                    <span style={{ color: '#014D40', fontWeight: '600' }}>
                                        ฿{item.price.toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            <hr style={{ margin: '16px 0' }} />

                            {/* Totals */}
                            <div className="d-flex justify-content-between mb-2">
                                <span style={{ color: '#666' }}>{t('ราคารวม', 'Subtotal')}</span>
                                <span>฿{total.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span style={{ color: '#666' }}>{t('ส่วนลด', 'Discount')}</span>
                                <span style={{ color: '#ed0606ff' }}>-฿0</span>
                            </div>

                            <hr style={{ margin: '16px 0' }} />

                            <div className="d-flex justify-content-between">
                                <strong style={{ color: '#014D40', fontSize: '18px' }}>{t('รวมทั้งหมด', 'Total')}</strong>
                                <strong style={{ color: '#014D40', fontSize: '24px' }}>฿{total.toLocaleString()}</strong>
                            </div>

                            {/* Back Link */}
                            <a
                                href="/checkout"
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: '24px',
                                    color: '#666',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                {t('กลับไปหน้าตะกร้า', 'Back to Cart')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentCardArea;
