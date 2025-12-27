"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Sample cart items
const CART_ITEMS = [
    {
        id: 1,
        title: 'React Zero to Hero: สร้างเว็บแอพพลิเคชัน',
        instructor: 'โค้ดพล',
        credits: 2,
        originalPrice: 3900,
        price: 2500,
        image: 'assets/img/courses/01.jpg',
    },
    {
        id: 2,
        title: 'UX/UI Design Masterclass',
        instructor: 'ดีไซน์เนอร์แอบ',
        credits: 2,
        originalPrice: null,
        price: 1990,
        image: 'assets/img/courses/02.jpg',
    },
    {
        id: 3,
        title: 'Data Science & Python: วิเคราะห์ข้อมูลธุรกิจ',
        instructor: 'ดร. ดาต้า',
        credits: 2,
        originalPrice: 6000,
        price: 4500,
        image: 'assets/img/courses/03.jpg',
    },
];

const CheckoutArea = () => {
    const { t } = useLanguage();
    const [cartItems, setCartItems] = useState(CART_ITEMS);
    const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'card'>('promptpay');
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountError, setDiscountError] = useState('');
    const [appliedCode, setAppliedCode] = useState('');

    // Sample voucher codes
    const VOUCHER_CODES: { [key: string]: { type: 'percent' | 'fixed'; value: number; minOrder?: number } } = {
        'WELCOME': { type: 'percent', value: 10 }, // 10% off
        'SAVE20': { type: 'percent', value: 20 }, // 20% off
        'PHARMA500': { type: 'fixed', value: 500 }, // 500 baht off
        'NEWUSER': { type: 'percent', value: 15, minOrder: 2000 }, // 15% off min 2000
        'VIP1000': { type: 'fixed', value: 1000, minOrder: 5000 }, // 1000 baht off min 5000
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearAll = () => {
        setCartItems([]);
    };

    const applyVoucher = () => {
        const code = voucherCode.toUpperCase().trim();

        if (!code) {
            setDiscountError(t('กรุณากรอกโค้ดส่วนลด', 'Please enter a voucher code'));
            return;
        }

        const voucher = VOUCHER_CODES[code];

        if (!voucher) {
            setDiscountError(t('โค้ดส่วนลดไม่ถูกต้อง', 'Invalid voucher code'));
            setDiscount(0);
            setDiscountApplied(false);
            return;
        }

        if (voucher.minOrder && subtotal < voucher.minOrder) {
            setDiscountError(t(`ยอดขั้นต่ำ ${voucher.minOrder.toLocaleString()} บาท`, `Minimum order ${voucher.minOrder.toLocaleString()} THB`));
            setDiscount(0);
            setDiscountApplied(false);
            return;
        }

        let discountAmount = 0;
        if (voucher.type === 'percent') {
            discountAmount = Math.round(subtotal * (voucher.value / 100));
        } else {
            discountAmount = voucher.value;
        }

        setDiscount(discountAmount);
        setDiscountApplied(true);
        setDiscountError('');
        setAppliedCode(code);
    };

    const removeVoucher = () => {
        setDiscount(0);
        setDiscountApplied(false);
        setVoucherCode('');
        setAppliedCode('');
        setDiscountError('');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const tax = Math.round(subtotal * 0.07);
    const total = subtotal - discount;

    return (
        <section className="checkout-section section-padding">
            <div className="container">
                <div className="row g-4">
                    {/* Left: Cart Items */}
                    <div className="col-lg-7">
                        <div className="cart-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 style={{ color: '#333', margin: 0 }}>
                                    {t('คอร์สเรียน', 'Courses')} ({cartItems.length})
                                </h5>
                                <button
                                    onClick={clearAll}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                    {t('ลบทั้งหมด', 'Clear All')}
                                </button>
                            </div>

                            {/* Cart Items */}
                            {cartItems.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-shopping-cart" style={{ fontSize: '48px', color: '#ddd', marginBottom: '16px' }}></i>
                                    <p style={{ color: '#666' }}>{t('ไม่มีคอร์สในตะกร้า', 'No courses in cart')}</p>
                                    <Link href="/courses-grid" className="theme-btn" style={{ padding: '10px 24px' }}>
                                        {t('เลือกคอร์สเรียน', 'Browse Courses')}
                                    </Link>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-item d-flex gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            {/* Course Image */}
                                            <div style={{
                                                width: '120px',
                                                height: '80px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-grow-1">
                                                <h6 style={{ color: '#014D40', marginBottom: '4px', fontSize: '15px' }}>
                                                    {item.title}
                                                </h6>
                                                <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>
                                                    Instructors: {item.instructor}
                                                </p>
                                                <span style={{
                                                    background: '#E8F8F4',
                                                    color: '#014D40',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px'
                                                }}>
                                                    {item.credits} Credit
                                                </span>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="text-end" style={{ minWidth: '100px' }}>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#999',
                                                        cursor: 'pointer',
                                                        padding: '4px',
                                                        marginBottom: '8px'
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                                <div>
                                                    {item.originalPrice && (
                                                        <p style={{
                                                            color: '#999',
                                                            fontSize: '13px',
                                                            textDecoration: 'line-through',
                                                            marginBottom: '2px'
                                                        }}>
                                                            {item.originalPrice.toLocaleString()} {t('บาท', 'THB')}
                                                        </p>
                                                    )}
                                                    <p style={{
                                                        color: '#014D40',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        margin: 0
                                                    }}>
                                                        {item.price.toLocaleString()} {t('บาท', 'THB')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Payment Options */}
                    <div className="col-lg-5">
                        <div className="payment-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                            <h5 style={{ color: '#014D40', marginBottom: '20px' }}>{t('เลือกช่องทางชำระเงิน', 'Select Payment Method')}</h5>

                            {/* Payment Methods */}
                            <div className="payment-methods mb-4">
                                {/* QR PromptPay */}
                                <label
                                    className="payment-option d-flex align-items-center justify-content-between p-3 mb-2"
                                    style={{
                                        border: paymentMethod === 'promptpay' ? '2px solid #014D40' : '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'promptpay' ? '#f8fffe' : '#fff'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#014D40',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="fas fa-qrcode" style={{ color: '#fff' }}></i>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>QR PromptPay</p>
                                            <small style={{ color: '#666' }}>{t('ไม่มีค่าธรรมเนียม • ยืนยันทันที', 'No fees • Instant confirmation')}</small>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: paymentMethod === 'promptpay' ? '6px solid #014D40' : '2px solid #ccc',
                                        background: '#fff'
                                    }}></div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'promptpay'}
                                        onChange={() => setPaymentMethod('promptpay')}
                                        style={{ display: 'none' }}
                                    />
                                </label>

                                {/* Credit/Debit Card */}
                                <label
                                    className="payment-option d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        border: paymentMethod === 'card' ? '2px solid #014D40' : '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'card' ? '#f8fffe' : '#fff'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#f0f0f0',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="fas fa-credit-card" style={{ color: '#666' }}></i>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>Credit/Debit Card</p>
                                            <div className="d-flex gap-1 mt-1">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: '16px' }} />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: '16px' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: paymentMethod === 'card' ? '6px solid #014D40' : '2px solid #ccc',
                                        background: '#fff'
                                    }}></div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>

                            {/* Voucher Code */}
                            <div className="voucher-section mb-4">
                                <label style={{ color: '#666', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                                    {t('โค้ดส่วนลด / VOUCHER', 'Discount Code / VOUCHER')}
                                </label>
                                {!discountApplied ? (
                                    <>
                                        <div className="d-flex gap-2">
                                            <input
                                                type="text"
                                                placeholder={t('ใส่รหัสส่วนลด (เช่น WELCOME)', 'Enter discount code (e.g. WELCOME)')}
                                                value={voucherCode}
                                                onChange={(e) => {
                                                    setVoucherCode(e.target.value);
                                                    setDiscountError('');
                                                }}
                                                onKeyPress={(e) => e.key === 'Enter' && applyVoucher()}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    border: discountError ? '1px solid #ef4444' : '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    color: '#333'
                                                }}
                                            />
                                            <button
                                                onClick={applyVoucher}
                                                style={{
                                                    background: '#014D40',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '12px 16px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <i className="fas fa-check"></i>
                                            </button>
                                        </div>
                                        {discountError && (
                                            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', marginBottom: 0 }}>
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {discountError}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: '#f0fdf4',
                                        border: '1px solid #22c55e',
                                        borderRadius: '8px'
                                    }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="fas fa-tag" style={{ color: '#22c55e' }}></i>
                                            <span style={{ color: '#166534', fontWeight: '500' }}>
                                                {appliedCode} - {t('ลด', 'Save')} ฿{discount.toLocaleString()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={removeVoucher}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#666',
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="order-summary mb-4">
                                <h6 style={{ color: '#014D40', marginBottom: '16px' }}>{t('สรุปยอดชำระ', 'Order Summary')}</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ color: '#666' }}>{t('ราคารวม', 'Subtotal')} ({cartItems.length} {t('รายการ', 'items')})</span>
                                    <span>{subtotal.toLocaleString()} {t('บาท', 'THB')}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="d-flex justify-content-between mb-2">
                                        <span style={{ color: '#22c55e' }}>
                                            <i className="fas fa-tag me-1"></i>
                                            {t('ส่วนลด', 'Discount')} ({appliedCode})
                                        </span>
                                        <span style={{ color: '#22c55e' }}>-{discount.toLocaleString()} {t('บาท', 'THB')}</span>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mb-3">
                                    <span style={{ color: '#666' }}>{t('ภาษี (7%)', 'Tax (7%)')}</span>
                                    <small style={{ color: '#999' }}>{t('รวมในราคาขายแล้ว', 'Included in price')}</small>
                                </div>

                                <div className="d-flex justify-content-between pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
                                    <strong style={{ color: '#014D40' }}>{t('ยอดสุทธิ', 'Total')}</strong>
                                    <div className="text-end">
                                        {discount > 0 && (
                                            <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '14px', marginRight: '8px' }}>
                                                ฿{subtotal.toLocaleString()}
                                            </span>
                                        )}
                                        <strong style={{ color: '#014D40', fontSize: '24px' }}>
                                            {total.toLocaleString()} {t('บาท', 'THB')}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => window.location.href = paymentMethod === 'promptpay' ? '/payment-qr' : '/payment-card'}
                                disabled={cartItems.length === 0}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: cartItems.length === 0 ? '#ccc' : '#014D40',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                                    marginBottom: '16px'
                                }}
                            >
                                {t('ดำเนินการชำระเงิน', 'Proceed to Payment')}
                            </button>

                            {/* Terms */}
                            <p className="text-center" style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                                {t('โดยการดำเนินการต่อ คุณยอมรับ', 'By proceeding, you agree to')}{' '}
                                <Link href="#" style={{ color: '#014D40' }}>{t('เงื่อนไขการให้บริการ', 'Terms of Service')}</Link>
                                {' '}{t('และ', 'and')}{' '}
                                <Link href="#" style={{ color: '#014D40' }}>{t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}</Link>
                                {' '}{t('ของ CourseD', 'of CourseD')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutArea;
