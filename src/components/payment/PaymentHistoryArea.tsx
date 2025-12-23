import Link from 'next/link';
import React from 'react';

const PaymentHistoryArea = () => {
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
                                <h3 style={{ color: '#004736', marginBottom: '0' }}>ประวัติการชำระเงิน</h3>
                                <Link href="/my-courses" className="theme-btn" style={{ padding: '10px 20px' }}>
                                    คอร์สของฉัน
                                </Link>
                            </div>

                            <div className="table-responsive">
                                <table className="table" style={{ marginBottom: '0' }}>
                                    <thead>
                                        <tr style={{ background: '#f8f9fa' }}>
                                            <th style={{ color: '#004736', padding: '15px' }}>รหัสคำสั่งซื้อ</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>คอร์ส</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>วันที่</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>ยอดเงิน</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>สถานะ</th>
                                            <th style={{ color: '#004736', padding: '15px' }}>การดำเนินการ</th>
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
                                                        สำเร็จ
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px' }}>
                                                    <Link href="#" style={{ color: '#004736' }}>
                                                        <i className="fas fa-download me-1"></i> ใบเสร็จ
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
                                        <p style={{ color: '#666', marginBottom: '0' }}>ยอดรวมทั้งหมด</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <h5 style={{ color: '#004736' }}>3</h5>
                                        <p style={{ color: '#666', marginBottom: '0' }}>คอร์สที่ซื้อ</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <h5 style={{ color: '#004736' }}>7.5</h5>
                                        <p style={{ color: '#666', marginBottom: '0' }}>หน่วยกิต CPE</p>
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
