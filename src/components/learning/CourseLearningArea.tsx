"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const CourseLearningArea = () => {
    const [currentLesson, setCurrentLesson] = useState(1);
    const [showQuiz, setShowQuiz] = useState(false);

    const lessons = [
        { id: 1, title: 'บทนำ: หลักการพื้นฐานของเภสัชวิทยา', duration: '15 นาที', completed: true },
        { id: 2, title: 'กลไกการออกฤทธิ์ของยา', duration: '25 นาที', completed: true },
        { id: 3, title: 'การดูดซึมและการกระจายตัวของยา', duration: '30 นาที', completed: false },
        { id: 4, title: 'การเปลี่ยนแปลงและการขับถ่ายยา', duration: '25 นาที', completed: false },
        { id: 5, title: 'แบบทดสอบท้ายบท', duration: '20 นาที', completed: false, isQuiz: true },
    ];

    return (
        <section className="course-learning-section">
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3" style={{
                        background: '#fff',
                        borderRight: '1px solid #e0e0e0',
                        minHeight: 'calc(100vh - 100px)',
                        padding: '0'
                    }}>
                        <div className="lesson-sidebar" style={{ padding: '20px' }}>
                            <div className="course-info mb-4" style={{
                                background: '#E8F8F4',
                                borderRadius: '10px',
                                padding: '15px'
                            }}>
                                <h6 style={{ color: '#004736', marginBottom: '5px' }}>เภสัชวิทยาคลินิกเบื้องต้น</h6>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>ความคืบหน้า: 40%</p>
                                <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
                                    <div className="progress-bar" style={{ width: '40%', background: '#004736', borderRadius: '3px' }}></div>
                                </div>
                            </div>

                            <h6 style={{ color: '#004736', marginBottom: '15px' }}>เนื้อหาการเรียน</h6>

                            {lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => {
                                        setCurrentLesson(lesson.id);
                                        setShowQuiz(lesson.isQuiz || false);
                                    }}
                                    style={{
                                        padding: '15px',
                                        borderRadius: '10px',
                                        marginBottom: '10px',
                                        cursor: 'pointer',
                                        background: currentLesson === lesson.id ? '#004736' : '#f8f9fa',
                                        color: currentLesson === lesson.id ? '#fff' : '#333',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            background: lesson.completed ? '#40C7A9' : (currentLesson === lesson.id ? 'rgba(255,255,255,0.2)' : '#e0e0e0'),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '12px',
                                            flexShrink: 0
                                        }}>
                                            {lesson.completed ? (
                                                <i className="fas fa-check" style={{ fontSize: '12px', color: '#fff' }}></i>
                                            ) : lesson.isQuiz ? (
                                                <i className="fas fa-question" style={{ fontSize: '12px', color: currentLesson === lesson.id ? '#fff' : '#666' }}></i>
                                            ) : (
                                                <i className="fas fa-play" style={{ fontSize: '10px', color: currentLesson === lesson.id ? '#fff' : '#666' }}></i>
                                            )}
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: '2px', fontSize: '14px', fontWeight: '500' }}>{lesson.title}</p>
                                            <small style={{ opacity: '0.7' }}>{lesson.duration}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9" style={{ padding: '30px' }}>
                        {showQuiz ? (
                            // Quiz View
                            <div className="quiz-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <h4 style={{ color: '#004736', marginBottom: '30px' }}>แบบทดสอบท้ายบท</h4>

                                <div className="quiz-question" style={{
                                    background: '#fff',
                                    borderRadius: '15px',
                                    padding: '30px',
                                    boxShadow: '0 5px 20px rgba(0, 71, 54, 0.1)',
                                    marginBottom: '20px'
                                }}>
                                    <p style={{ color: '#666', marginBottom: '5px' }}>คำถามที่ 1 จาก 10</p>
                                    <h5 style={{ color: '#004736', marginBottom: '25px' }}>
                                        กระบวนการใดที่เกี่ยวข้องกับการดูดซึมยาเข้าสู่กระแสเลือด?
                                    </h5>

                                    <div className="options">
                                        {['Absorption', 'Distribution', 'Metabolism', 'Excretion'].map((option, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: '15px 20px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    marginBottom: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = '#004736';
                                                    e.currentTarget.style.background = '#E8F8F4';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                                    e.currentTarget.style.background = 'transparent';
                                                }}
                                            >
                                                <span style={{ color: '#004736', fontWeight: '600', marginRight: '15px' }}>
                                                    {String.fromCharCode(65 + index)}.
                                                </span>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="theme-btn" style={{ background: '#f8f9fa', color: '#004736', border: '1px solid #e0e0e0' }}>
                                        <i className="fas fa-arrow-left me-2"></i>ข้อก่อนหน้า
                                    </button>
                                    <button className="theme-btn">
                                        ข้อถัดไป<i className="fas fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Video View
                            <div className="video-wrapper">
                                <div className="video-player" style={{
                                    background: '#000',
                                    borderRadius: '15px',
                                    aspectRatio: '16/9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                    position: 'relative'
                                }}>
                                    <div className="play-button" style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(0, 71, 54, 0.8)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <i className="fas fa-play" style={{ fontSize: '30px', color: '#fff', marginLeft: '5px' }}></i>
                                    </div>
                                </div>

                                <div className="video-info" style={{
                                    background: '#fff',
                                    borderRadius: '15px',
                                    padding: '25px',
                                    boxShadow: '0 5px 20px rgba(0, 71, 54, 0.1)'
                                }}>
                                    <h4 style={{ color: '#004736', marginBottom: '15px' }}>
                                        {lessons.find(l => l.id === currentLesson)?.title}
                                    </h4>
                                    <p style={{ color: '#666', marginBottom: '20px' }}>
                                        ในบทนี้เราจะเรียนรู้เกี่ยวกับหลักการพื้นฐานของเภสัชวิทยา
                                        รวมถึงความสำคัญของการเข้าใจกลไกการออกฤทธิ์ของยาในร่างกาย
                                    </p>
                                    <div className="d-flex gap-3">
                                        <button className="theme-btn">
                                            ทำเครื่องหมายว่าเรียนจบแล้ว
                                        </button>
                                        <Link href="/my-courses" className="theme-btn" style={{
                                            background: 'transparent',
                                            border: '2px solid #004736',
                                            color: '#004736'
                                        }}>
                                            กลับไปคอร์สของฉัน
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseLearningArea;
