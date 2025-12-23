"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const PaymentSuccessArea = () => {
    // In real app, this would come from URL params or payment processing result
    const [isSuccess] = useState(true); // Change to false to see failed state
    
    // Mock transaction data
    const transactionData = {
        amount: 8990,
        errorCode: 'ERR_DECLINED',
        paymentMethod: 'Mastercard **** 4242',
        merchant: 'Pharmacy Academy',
        email: 'customer@example.com'
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
                                        background: isSuccess ? '#004736' : '#ef4444',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}>{isSuccess ? '✓' : '2'}</div>
                                    <span style={{ marginLeft: '10px', fontWeight: '500', color: isSuccess ? '#004736' : '#ef4444' }}>ชำระเงิน</span>
                                </div>
                                
                                {/* Line */}
                                <div style={{ width: '80px', height: '2px', background: isSuccess ? '#004736' : '#ddd', margin: '0 20px' }}></div>
                                
                                {/* Step 3 */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: isSuccess ? '#004736' : '#ddd',
                                        color: isSuccess ? '#fff' : '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}>{isSuccess ? '✓' : '3'}</div>
                                    <span style={{ marginLeft: '10px', fontWeight: '500', color: isSuccess ? '#004736' : '#666' }}>ยืนยัน</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '40px 35px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                        }}>
                            {isSuccess ? (
                                <>
                                    {/* Success Icon */}
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: '#22c55e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                    }}>
                                        <i className="fas fa-check" style={{ fontSize: '28px', color: '#fff' }}></i>
                                    </div>

                                    {/* Success Message */}
                                    <h3 style={{ margin: '0 0 10px', color: '#22c55e', fontWeight: '600' }}>Payment Successful!</h3>
                                    <p style={{ margin: '0 0 25px', color: '#666', fontSize: '14px' }}>
                                        Your payment has been processed successfully.<br />
                                        You will receive a confirmation email shortly.
                                    </p>

                                    {/* Order Details */}
                                    <div style={{
                                        background: '#f9fafb',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginBottom: '25px',
                                        textAlign: 'left',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Amount Paid</span>
                                            <span style={{ color: '#333', fontWeight: '600' }}>฿{transactionData.amount.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Payment Method</span>
                                            <span style={{ color: '#333', fontWeight: '500' }}>{transactionData.paymentMethod}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Merchant</span>
                                            <span style={{ color: '#333', fontWeight: '500' }}>{transactionData.merchant}</span>
                                        </div>
                                    </div>

                                    {/* Success Notice */}
                                    <div style={{
                                        background: '#dcfce7',
                                        borderRadius: '8px',
                                        padding: '12px 15px',
                                        marginBottom: '25px',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '10px',
                                        textAlign: 'left',
                                    }}>
                                        <i className="fas fa-check-circle" style={{ color: '#16a34a', marginTop: '2px' }}></i>
                                        <span style={{ fontSize: '13px', color: '#166534' }}>
                                            <strong>Success:</strong> Your courses have been added to your account. 
                                            You can start learning now!
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <Link 
                                        href="/my-courses"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            background: '#004736',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '14px',
                                            borderRadius: '10px',
                                            fontWeight: '600',
                                            fontSize: '15px',
                                            textDecoration: 'none',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        <i className="fas fa-play-circle me-2"></i>
                                        Start Learning
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/* Failed Icon */}
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: '#fef2f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                    }}>
                                        <i className="fas fa-times" style={{ fontSize: '28px', color: '#ef4444' }}></i>
                                    </div>

                                    {/* Failed Message */}
                                    <h3 style={{ margin: '0 0 10px', color: '#ef4444', fontWeight: '600' }}>Payment Failed</h3>
                                    <p style={{ margin: '0 0 25px', color: '#666', fontSize: '14px' }}>
                                        We couldn't process your payment.<br />
                                        Please check your card details and try again.
                                    </p>

                                    {/* Order Details */}
                                    <div style={{
                                        background: '#f9fafb',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginBottom: '25px',
                                        textAlign: 'left',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Amount Attempted</span>
                                            <span style={{ color: '#333', fontWeight: '600' }}>฿{transactionData.amount.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Error Code</span>
                                            <span style={{ color: '#ef4444', fontWeight: '600' }}>{transactionData.errorCode}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Payment Method</span>
                                            <span style={{ color: '#333', fontWeight: '500' }}>{transactionData.paymentMethod}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#666', fontSize: '14px' }}>Merchant</span>
                                            <span style={{ color: '#333', fontWeight: '500' }}>{transactionData.merchant}</span>
                                        </div>
                                    </div>

                                    {/* Error Notice */}
                                    <div style={{
                                        background: '#fef2f2',
                                        borderRadius: '8px',
                                        padding: '12px 15px',
                                        marginBottom: '25px',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '10px',
                                        textAlign: 'left',
                                    }}>
                                        <i className="fas fa-exclamation-circle" style={{ color: '#ef4444', marginTop: '2px' }}></i>
                                        <span style={{ fontSize: '13px', color: '#991b1b' }}>
                                            <strong>Declined:</strong> Your bank declined this transaction. 
                                            Please contact your bank.
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <Link 
                                        href="/shop-cart"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            background: '#ef4444',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '14px',
                                            borderRadius: '10px',
                                            fontWeight: '600',
                                            fontSize: '15px',
                                            textDecoration: 'none',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        <i className="fas fa-redo me-2"></i>
                                        Try Again
                                    </Link>

                                    <Link 
                                        href="/shop-cart"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            background: '#fff',
                                            color: '#333',
                                            border: '1px solid #ddd',
                                            padding: '14px',
                                            borderRadius: '10px',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Change Payment Method
                                    </Link>
                                </>
                            )}

                            <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
                                Need help? <Link href="#" style={{ color: '#004736' }}>Contact Support</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessArea;
