"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

const ShopCartArea = () => {
    const { cartItems, removeFromCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState<'promptpay' | 'card'>('promptpay');
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [voucherError, setVoucherError] = useState('');
    const [voucherSuccess, setVoucherSuccess] = useState('');

    // Mock voucher codes
    const VOUCHERS: { [key: string]: { discount: number; type: 'percent' | 'fixed'; description: string } } = {
        'WELCOME': { discount: 10, type: 'percent', description: 'ส่วนลด 10%' },
        'SAVE500': { discount: 500, type: 'fixed', description: 'ส่วนลด 500 บาท' },
        'PHARMACY20': { discount: 20, type: 'percent', description: 'ส่วนลด 20%' },
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal - discountAmount;

    const applyVoucher = () => {
        const code = voucherCode.toUpperCase().trim();
        
        if (!code) {
            setVoucherError('กรุณากรอกโค้ดส่วนลด');
            setVoucherSuccess('');
            return;
        }

        if (appliedVoucher) {
            setVoucherError('คุณได้ใช้โค้ดส่วนลดไปแล้ว');
            setVoucherSuccess('');
            return;
        }

        const voucher = VOUCHERS[code];
        if (voucher) {
            let discount = 0;
            if (voucher.type === 'percent') {
                discount = Math.round(subtotal * voucher.discount / 100);
            } else {
                discount = voucher.discount;
            }
            setDiscountAmount(discount);
            setAppliedVoucher(code);
            setVoucherError('');
            setVoucherSuccess(`ใช้โค้ด ${code} สำเร็จ! ${voucher.description}`);
        } else {
            setVoucherError('โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุ');
            setVoucherSuccess('');
        }
    };

    const removeVoucher = () => {
        setAppliedVoucher(null);
        setDiscountAmount(0);
        setVoucherCode('');
        setVoucherSuccess('');
        setVoucherError('');
    };

    const removeItem = (id: number) => {
        removeFromCart(id);
    };

    return (
        <>
            <div className="cart-section section-padding">
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
                                        }}>1</div>
                                        <span style={{ marginLeft: '10px', fontWeight: '500', color: '#004736' }}>รายละเอียด</span>
                                    </div>
                                    
                                    {/* Line */}
                                    <div style={{ width: '80px', height: '2px', background: '#ddd', margin: '0 20px' }}></div>
                                    
                                    {/* Step 2 */}
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
                                        }}>2</div>
                                        <span style={{ marginLeft: '10px', fontWeight: '500', color: '#666' }}>ชำระเงิน</span>
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

                    <div className="row g-4">
                        {/* Left Column - Cart Items */}
                        <div className="col-lg-7">
                            <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h4 style={{ margin: 0, color: '#333' }}>รายการในตะกร้า</h4>
                                    <span style={{ color: '#666', fontSize: '14px' }}>คอร์สเรียน ({cartItems.length})</span>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                                        <i className="fas fa-shopping-cart" style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.3 }}></i>
                                        <p>ไม่มีคอร์สในตะกร้า</p>
                                        <Link href="/courses-grid" className="theme-btn" style={{ marginTop: '15px' }}>ดูคอร์สทั้งหมด</Link>
                                    </div>
                                ) : (
                                    <div>
                                        {cartItems.map((item) => (
                                            <div key={item.id} style={{
                                                display: 'flex',
                                                gap: '15px',
                                                padding: '15px',
                                                borderRadius: '10px',
                                                background: '#f9fafb',
                                                marginBottom: '12px',
                                            }}>
                                                {/* Course Image */}
                                                <div style={{
                                                    width: '120px',
                                                    height: '80px',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                }}>
                                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>

                                                {/* Course Info */}
                                                <div style={{ flex: 1 }}>
                                                    <h5 style={{ margin: '0 0 5px', fontSize: '15px', color: '#333' }}>{item.title}</h5>
                                                    <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#666' }}>{item.instructor}</p>
                                                    {item.category && (
                                                        <span style={{
                                                            display: 'inline-block',
                                                            padding: '3px 10px',
                                                            background: '#dcfce7',
                                                            color: '#166534',
                                                            borderRadius: '4px',
                                                            fontSize: '12px',
                                                            fontWeight: '500',
                                                        }}>{item.category}</span>
                                                    )}
                                                </div>

                                                {/* Price & Remove */}
                                                <div style={{ textAlign: 'right' }}>
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <i className="fas fa-trash-alt"></i> ลบรายการ
                                                    </button>
                                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#004736' }}>
                                                        {item.price.toLocaleString()} บาท
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Payment Options & Summary */}
                        <div className="col-lg-5">
                            {/* Payment Options */}
                            <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                                <h5 style={{ margin: '0 0 20px', color: '#333' }}>เลือกช่องทางชำระเงิน</h5>
                                
                                {/* QR PromptPay */}
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px',
                                    border: selectedPayment === 'promptpay' ? '2px solid #004736' : '1px solid #ddd',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    background: selectedPayment === 'promptpay' ? '#f0fdf4' : '#fff',
                                }}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        checked={selectedPayment === 'promptpay'}
                                        onChange={() => setSelectedPayment('promptpay')}
                                        style={{ marginRight: '15px', accentColor: '#004736' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontWeight: '500', color: '#333' }}>QR PromptPay</span>
                                        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>No fees • Instant confirmation.</p>
                                    </div>
                                    <img src="/assets/img/prompt-pay-logo.png" alt="PromptPay" style={{ height: '32px' }} />
                                </label>

                                {/* Credit/Debit Card */}
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px',
                                    border: selectedPayment === 'card' ? '2px solid #004736' : '1px solid #ddd',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    background: selectedPayment === 'card' ? '#f0fdf4' : '#fff',
                                }}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        checked={selectedPayment === 'card'}
                                        onChange={() => setSelectedPayment('card')}
                                        style={{ marginRight: '15px', accentColor: '#004736' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontWeight: '500', color: '#333' }}>Credit/Debit Card</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '16px' }} />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '24px' }} />
                                    </div>
                                </label>
                            </div>

                            {/* Voucher */}
                            <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                                <h5 style={{ margin: '0 0 15px', color: '#333', fontSize: '14px' }}>โค้ดส่วนลด / VOUCHER</h5>
                                
                                {appliedVoucher ? (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 15px',
                                        background: '#f0fdf4',
                                        border: '1px solid #22c55e',
                                        borderRadius: '8px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <i className="fas fa-tag" style={{ color: '#22c55e' }}></i>
                                            <span style={{ color: '#166534', fontWeight: '500' }}>{appliedVoucher}</span>
                                        </div>
                                        <button 
                                            onClick={removeVoucher}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ef4444',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                            }}
                                        >
                                            <i className="fas fa-times"></i> ยกเลิก
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            type="text" 
                                            placeholder="กรอกโค้ดส่วนลด เช่น WELCOME"
                                            value={voucherCode}
                                            onChange={(e) => {
                                                setVoucherCode(e.target.value);
                                                setVoucherError('');
                                            }}
                                            onKeyPress={(e) => e.key === 'Enter' && applyVoucher()}
                                            style={{
                                                flex: 1,
                                                padding: '12px 15px',
                                                border: voucherError ? '1px solid #ef4444' : '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                outline: 'none',
                                                color: '#333',
                                                background: '#fff',
                                            }}
                                        />
                                        <button
                                            onClick={applyVoucher}
                                            style={{
                                                padding: '12px 20px',
                                                background: '#004736',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                            }}
                                        >
                                            ใช้โค้ด
                                        </button>
                                    </div>
                                )}
                                
                                {voucherError && (
                                    <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#ef4444' }}>
                                        <i className="fas fa-exclamation-circle me-1"></i> {voucherError}
                                    </p>
                                )}
                                {voucherSuccess && (
                                    <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#22c55e' }}>
                                        <i className="fas fa-check-circle me-1"></i> {voucherSuccess}
                                    </p>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
                                <h5 style={{ margin: '0 0 20px', color: '#333' }}>สรุปยอดชำระ</h5>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: '#666' }}>ราคารวม ({cartItems.length} รายการ)</span>
                                    <span style={{ color: '#333' }}>{subtotal.toLocaleString()} บาท</span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <span style={{ color: '#666' }}>ส่วนลด {appliedVoucher && `(${appliedVoucher})`}</span>
                                    <span style={{ color: discountAmount > 0 ? '#ef4444' : '#666' }}>
                                        {discountAmount > 0 ? `-${discountAmount.toLocaleString()} บาท` : '-'}
                                    </span>
                                </div>
                                
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>ยอดสุทธิ</span>
                                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#004736' }}>{total.toLocaleString()} บาท</span>
                                    </div>
                                </div>

                                <Link 
                                    href={selectedPayment === 'promptpay' ? '/payment-promptpay' : '/payment-card'}
                                    className="theme-btn"
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        background: cartItems.length === 0 ? '#ccc' : '#004736',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                                        display: 'block',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        pointerEvents: cartItems.length === 0 ? 'none' : 'auto',
                                    }}
                                >
                                    ดำเนินการชำระเงิน
                                </Link>

                                <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '16px', color: '#666' }}>
                                    เมื่อคลิกปุ่ม "ดำเนินการชำระเงิน" คุณยอมรับ<br />
                                    <Link href="#" style={{ color: '#004736' }}>เงื่อนไขการใช้บริการ</Link> และ <Link href="#" style={{ color: '#004736' }}>นโยบายความเป็นส่วนตัว</Link>
                                </p>

                                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                    <span style={{ fontSize: '12px', color: '#666' }}>Powered by </span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Omise</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopCartArea;