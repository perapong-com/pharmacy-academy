"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const PaymentCardArea = () => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const orderTotal = 8990;

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    return (
        <div className="payment-section section-padding" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <div className="container">
                {/* Progress Steps */}
                <div className="checkout-steps mb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0',
                            }}>
                                {/* Step 1 */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: '#004736',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}>✓</div>
                                    <span style={{ marginLeft: '10px', fontWeight: '500', color: '#004736' }}>รายละเอียด</span>
                                </div>
                                
                                {/* Line */}
                                <div style={{ width: '80px', height: '2px', background: '#004736', margin: '0 20px' }}></div>
                                
                                {/* Step 2 */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: '#004736',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}>2</div>
                                    <span style={{ marginLeft: '10px', fontWeight: '500', color: '#004736' }}>ชำระเงิน</span>
                                </div>
                                
                                {/* Line */}
                                <div style={{ width: '80px', height: '2px', background: '#ddd', margin: '0 20px' }}></div>
                                
                                {/* Step 3 */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: '#ddd',
                                        color: '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}>3</div>
                                    <span style={{ marginLeft: '10px', fontWeight: '500', color: '#666' }}>ยืนยัน</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mb-4">
                    <Link href="/shop-cart" style={{ color: '#666', textDecoration: 'none', fontSize: '18px' }}>
                        <i className="fas fa-arrow-left me-2"></i>
                        Go back and select a payment method.
                    </Link>
                </div>

                {/* Credit Card Form */}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '35px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                                <i className="fas fa-credit-card" style={{ fontSize: '24px', color: '#004736', marginRight: '15px' }}></i>
                                <h4 style={{ margin: 0, color: '#333' }}>Pay by credit card.</h4>
                            </div>

                            {/* Card Form */}
                            <form onSubmit={(e) => e.preventDefault()}>
                                {/* Name on Card */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                                        Name on the card
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="SOMCHAI RAKDEE"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            outline: 'none',
                                            color: '#333',
                                            background: '#fff',
                                        }}
                                    />
                                </div>

                                {/* Card Number, Expiry, CVV */}
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'flex-end' }}>
                                    <div style={{ flex: 2 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px', minHeight: '20px' }}>
                                            Card number
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fas fa-credit-card" style={{ 
                                                position: 'absolute', 
                                                left: '14px', 
                                                top: '50%', 
                                                transform: 'translateY(-50%)',
                                                color: '#999',
                                            }}></i>
                                            <input 
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 16px 14px 45px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    outline: 'none',
                                                    color: '#333',
                                                    background: '#fff',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px', minHeight: '20px' }}>
                                            Expiration date<br />(MM/YY)
                                        </label>
                                        <input 
                                            type="text"
                                            placeholder="MM / YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            maxLength={7}
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '10px',
                                                fontSize: '15px',
                                                outline: 'none',
                                                color: '#333',
                                                background: '#fff',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flex: 0.6 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px', minHeight: '20px' }}>
                                            CVV
                                        </label>
                                        <input 
                                            type="password"
                                            placeholder="123"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            maxLength={4}
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '10px',
                                                fontSize: '15px',
                                                outline: 'none',
                                                color: '#333',
                                                background: '#fff',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <button 
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        background: '#004736',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <i className="fas fa-lock"></i>
                                    Pay immediately ฿{orderTotal.toLocaleString()}.00
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCardArea;
