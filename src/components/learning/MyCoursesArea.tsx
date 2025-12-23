"use client";

import Link from 'next/link';
import React from 'react';

const MyCoursesArea = () => {
    const myCourses = [
        {
            id: 1,
            title: 'เภสัชวิทยาคลินิกเบื้องต้น',
            instructor: 'ภก.สมชาย ใจดี',
            cpe: 2.5,
            progress: 75,
            image: '/assets/img/courses/course-1.jpg'
        },
        {
            id: 2,
            title: 'การบริบาลเภสัชกรรมผู้ป่วยเบาหวาน',
            instructor: 'ภก.วิชัย สุขใจ',
            cpe: 3.0,
            progress: 30,
            image: '/assets/img/courses/course-2.jpg'
        },
        {
            id: 3,
            title: 'กฎหมายเภสัชกรรมเบื้องต้น',
            instructor: 'ภก.ประสิทธิ์ นิติกร',
            cpe: 2.0,
            progress: 100,
            image: '/assets/img/courses/course-3.jpg'
        },
    ];

    return (
        <section className="my-courses-section section-padding">
            <div className="container">
                {/* CPE Summary */}
                <div className="cpe-summary mb-5" style={{
                    background: 'linear-gradient(135deg, #004736 0%, #006B52 100%)',
                    borderRadius: '20px',
                    padding: '30px 40px',
                    color: '#fff'
                }}>
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h4 style={{ marginBottom: '10px' }}>หน่วยกิต CPE ของคุณ</h4>
                            <p style={{ marginBottom: '0', opacity: '0.8' }}>ปีนี้คุณสะสมได้ 7.5 หน่วยกิต จากเป้าหมาย 10 หน่วยกิต</p>
                        </div>
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <div style={{ fontSize: '40px', fontWeight: 'bold' }}>7.5 <span style={{ fontSize: '18px', opacity: '0.8' }}>/ 10 CPE</span></div>
                        </div>
                    </div>
                    <div className="progress mt-3" style={{ height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.3)' }}>
                        <div className="progress-bar" style={{ width: '75%', background: '#40C7A9', borderRadius: '5px' }}></div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 style={{ color: '#004736', marginBottom: '0' }}>คอร์สของฉัน</h3>
                    <Link href="/courses-grid" className="theme-btn" style={{ padding: '10px 20px' }}>
                        ค้นหาคอร์สเพิ่ม
                    </Link>
                </div>

                <div className="row g-4">
                    {myCourses.map((course) => (
                        <div key={course.id} className="col-lg-4 col-md-6">
                            <div className="course-card" style={{
                                background: '#fff',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 5px 20px rgba(0, 71, 54, 0.1)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <div className="course-image" style={{
                                    height: '180px',
                                    background: `linear-gradient(135deg, #004736 0%, #006B52 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="fas fa-book-medical" style={{ fontSize: '50px', color: '#fff', opacity: '0.5' }}></i>
                                </div>
                                <div className="course-content" style={{ padding: '20px' }}>
                                    <h5 style={{ color: '#004736', marginBottom: '10px' }}>{course.title}</h5>
                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                                        <i className="fas fa-user me-2"></i>{course.instructor}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{
                                            background: '#E8F8F4',
                                            color: '#004736',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '13px'
                                        }}>
                                            {course.cpe} หน่วยกิต
                                        </span>
                                        <span style={{ color: '#666', fontSize: '14px' }}>
                                            {course.progress}% เสร็จสิ้น
                                        </span>
                                    </div>
                                    <div className="progress mb-3" style={{ height: '6px', borderRadius: '3px' }}>
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${course.progress}%`,
                                                background: course.progress === 100 ? '#40C7A9' : '#004736',
                                                borderRadius: '3px'
                                            }}
                                        ></div>
                                    </div>
                                    <Link
                                        href="/course-learning"
                                        className="theme-btn w-100"
                                        style={{ padding: '10px', fontSize: '14px' }}
                                    >
                                        {course.progress === 100 ? 'ดูใบประกาศ' : 'เรียนต่อ'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyCoursesArea;
