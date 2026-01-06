"use client"
import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PaymentHistoryArea = () => {
    const { t } = useLanguage();
    const payments = [
        { id: 'PA-2024-001234', course: 'เภสัชวิทยาคลินิกเบื้องต้น', date: '19 ธ.ค. 2567', amount: 1500, status: 'success' },
        { id: 'PA-2024-001233', course: 'การบริบาลเภสัชกรรมผู้ป่วยเบาหวาน', date: '15 ธ.ค. 2567', amount: 2000, status: 'success' },
        { id: 'PA-2024-001232', course: 'กฎหมายเภสัชกรรมเบื้องต้น', date: '10 ธ.ค. 2567', amount: 1200, status: 'success' },
    ];

    return (
        <section className="payment-history-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="history-wrapper" style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '40px',
                            boxShadow: '0 10px 40px rgba(0, 71, 54, 0.1)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 style={{ color: '#004736', marginBottom: '0' }}>{t('ประวัติการชำระเงิน', 'Payment History')}</h3>
                            </div>

                            <div className="table-responsive">
                                <table className="table" style={{ marginBottom: '0' }}>
                                    <thead>
                                        <tr style={{ background: '#f8f9fa' }}>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('รหัสคำสั่งซื้อ', 'Order ID')}</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('คอร์ส', 'Course')}</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('วันที่', 'Date')}</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('ยอดเงิน', 'Amount')}</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('สถานะ', 'Status')}</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>{t('การดำเนินการ', 'Action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                                <td style={{ padding: '15px', color: '#004736' }}>{payment.id}</td>
                                                <td style={{ padding: '15px', color: '#333' }}>{payment.course}</td>
                                                <td style={{ padding: '15px', color: '#666' }}>{payment.date}</td>
                                                <td style={{ padding: '15px', color: '#004736', fontWeight: '600' }}>฿{payment.amount.toLocaleString()}</td>
                                                <td style={{ padding: '15px' }}>
                                                    <span style={{
                                                        background: '#E8F8F4',
                                                        color: '#40C7A9',
                                                        padding: '5px 15px',
                                                        borderRadius: '20px',
                                                        fontSize: '14px'
                                                    }}>
                                                        {t('สำเร็จ', 'Success')}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px' }}>
                                                    <Link href="#" style={{ color: '#004736' }}>
                                                        <i className="fas fa-download me-1"></i> {t('ใบเสร็จ', 'Receipt')}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="summary-box mt-4" style={{
                                background: '#E8F8F4',
                                borderRadius: '10px',
                                padding: '20px'
                            }}>
                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <h5 style={{ color: '#004736' }}>฿4,700</h5>
                                        <p style={{ color: '#666', marginBottom: '0' }}>{t('ยอดรวมทั้งหมด', 'Total Amount')}</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <h5 style={{ color: '#004736' }}>3</h5>
                                        <p style={{ color: '#666', marginBottom: '0' }}>{t('คอร์สที่ซื้อ', 'Courses Purchased')}</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <h5 style={{ color: '#004736' }}>7.5</h5>
                                        <p style={{ color: '#666', marginBottom: '0' }}>{t('หน่วยกิต CPE', 'CPE Credits')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentHistoryArea;
