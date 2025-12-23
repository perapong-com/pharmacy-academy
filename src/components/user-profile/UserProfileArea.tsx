"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Mock user data - in real app, this would come from AuthContext or API
const mockUser = {
    firstName: "สมชาย",
    lastName: "ใจดี",
    email: "somchai@example.com",
    phone: "081-234-5678",
    userType: "pharmacist" as "general" | "pharmacist",
    licenseNumber: "ภ.12345",
    facilityName: "ร้านยาเภสัชสุข",
    profileImage: null as string | null,
    joinDate: "15 ม.ค. 2567"
};

// Mock courses data
const mockCourses = [
    { 
        id: 1, 
        title: "เภสัชวิทยาพื้นฐาน", 
        image: "assets/img/courses/course-1.png",
        progress: 100, 
        status: "completed" as const,
        cpe: 5,
        instructor: "ภก. วิชัย สุขสบาย"
    },
    { 
        id: 2, 
        title: "การบริบาลเภสัชกรรมผู้ป่วยเบาหวาน", 
        image: "assets/img/courses/course-2.png",
        progress: 65, 
        status: "in_progress" as const,
        cpe: 3,
        instructor: "ภญ. สมหญิง รักษาดี"
    },
    { 
        id: 3, 
        title: "กฎหมายเภสัชกรรม 2567", 
        image: "assets/img/courses/course-3.png",
        progress: 30, 
        status: "in_progress" as const,
        cpe: 4,
        instructor: "ภก. ประสิทธิ์ กฎหมาย"
    },
    { 
        id: 4, 
        title: "การจ่ายยาปฏิชีวนะอย่างสมเหตุผล", 
        image: "assets/img/courses/course-4.png",
        progress: 0, 
        status: "registered" as const,
        cpe: 2,
        instructor: "ภก. สมศักดิ์ ปฏิชีวนะ"
    },
    { 
        id: 5, 
        title: "เภสัชกรรมชุมชนยุคใหม่", 
        image: "assets/img/courses/course-5.png",
        progress: 100, 
        status: "completed" as const,
        cpe: 6,
        instructor: "ภญ. นภา ชุมชน"
    },
];

const UserProfileArea = () => {
    const [activeTab, setActiveTab] = useState<"all" | "in_progress" | "completed">("all");
    
    // Calculate stats
    const totalCourses = mockCourses.length;
    const inProgressCourses = mockCourses.filter(c => c.status === "in_progress").length;
    const completedCourses = mockCourses.filter(c => c.status === "completed").length;
    const totalCertificates = completedCourses;
    
    // Filter courses based on active tab
    const filteredCourses = activeTab === "all" 
        ? mockCourses 
        : mockCourses.filter(c => c.status === activeTab);

    const getStatusBadge = (status: string) => {
        switch(status) {
            case "completed":
                return { text: "เรียนจบแล้ว", bg: "#dcfce7", color: "#166534" };
            case "in_progress":
                return { text: "กำลังเรียน", bg: "#fef3c7", color: "#92400e" };
            default:
                return { text: "ลงทะเบียนแล้ว", bg: "#e0f2fe", color: "#0369a1" };
        }
    };

    return (
        <section className="user-profile-section py-5">
            <div className="container">
                <div className="row">
                    {/* Left Column - User Info */}
                    <div className="col-lg-4 mb-4">
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '30px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            textAlign: 'center'
                        }}>
                            {/* Profile Image */}
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #004736 0%, #00875a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                boxShadow: '0 4px 15px rgba(0,71,54,0.3)'
                            }}>
                                {mockUser.profileImage ? (
                                    <img 
                                        src={mockUser.profileImage} 
                                        alt="Profile" 
                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <i className="fas fa-user" style={{ fontSize: '50px', color: '#fff' }}></i>
                                )}
                            </div>

                            {/* User Name */}
                            <h3 style={{ color: '#004736', marginBottom: '5px', fontSize: '22px' }}>
                                {mockUser.firstName} {mockUser.lastName}
                            </h3>
                            
                            {/* User Type Badge */}
                            <span style={{
                                display: 'inline-block',
                                padding: '6px 16px',
                                background: mockUser.userType === 'pharmacist' ? '#dcfce7' : '#e0f2fe',
                                color: mockUser.userType === 'pharmacist' ? '#166534' : '#0369a1',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '500',
                                marginBottom: '20px'
                            }}>
                                {mockUser.userType === 'pharmacist' ? '👨‍⚕️ เภสัชกร' : '👤 บุคคลทั่วไป'}
                            </span>

                            {/* User Details */}
                            <div style={{ textAlign: 'left', marginTop: '20px' }}>
                                <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>อีเมล</p>
                                    <p style={{ margin: '4px 0 0', color: '#333', fontWeight: '500' }}>{mockUser.email}</p>
                                </div>
                                <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>เบอร์โทรศัพท์</p>
                                    <p style={{ margin: '4px 0 0', color: '#333', fontWeight: '500' }}>{mockUser.phone}</p>
                                </div>
                                {mockUser.userType === 'pharmacist' && (
                                    <>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                                            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>เลขที่ใบอนุญาต</p>
                                            <p style={{ margin: '4px 0 0', color: '#333', fontWeight: '500' }}>{mockUser.licenseNumber}</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                                            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>ร้านยา/สถานพยาบาล</p>
                                            <p style={{ margin: '4px 0 0', color: '#333', fontWeight: '500' }}>{mockUser.facilityName}</p>
                                        </div>
                                    </>
                                )}
                                <div style={{ padding: '12px 0' }}>
                                    <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>สมาชิกตั้งแต่</p>
                                    <p style={{ margin: '4px 0 0', color: '#333', fontWeight: '500' }}>{mockUser.joinDate}</p>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <button style={{
                                width: '100%',
                                marginTop: '20px',
                                padding: '12px',
                                background: 'transparent',
                                border: '2px solid #004736',
                                borderRadius: '10px',
                                color: '#004736',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#004736';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#004736';
                            }}>
                                <i className="fas fa-edit me-2"></i>
                                แก้ไขโปรไฟล์
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Stats & Courses */}
                    <div className="col-lg-8">
                        {/* Stats Cards */}
                        <div className="row mb-4">
                            <div className="col-6 col-md-3 mb-3">
                                <div style={{
                                    background: '#004736',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    <i className="fas fa-book-open" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{totalCourses}</h3>
                                    <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>คอร์สทั้งหมด</p>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                                <div style={{
                                    background: '#00875a',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    <i className="fas fa-spinner" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{inProgressCourses}</h3>
                                    <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>กำลังเรียน</p>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                                <div style={{
                                    background: '#004736',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    <i className="fas fa-check-circle" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{completedCourses}</h3>
                                    <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>เรียนจบแล้ว</p>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                                <div style={{
                                    background: '#00875a',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    <i className="fas fa-award" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{totalCertificates}</h3>
                                    <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>ใบ Certificate</p>
                                </div>
                            </div>
                        </div>

                        {/* Courses Section */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '25px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ color: '#004736', margin: 0 }}>
                                    <i className="fas fa-graduation-cap me-2"></i>
                                    คอร์สเรียนของฉัน
                                </h4>
                            </div>

                            {/* Tabs */}
                            <div style={{ 
                                display: 'flex', 
                                gap: '10px', 
                                marginBottom: '20px',
                                borderBottom: '2px solid #f0f0f0',
                                paddingBottom: '10px'
                            }}>
                                {[
                                    { key: "all", label: "ทั้งหมด", count: totalCourses },
                                    { key: "in_progress", label: "กำลังเรียน", count: inProgressCourses },
                                    { key: "completed", label: "เรียนจบ", count: completedCourses }
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key as any)}
                                        style={{
                                            padding: '8px 16px',
                                            background: activeTab === tab.key ? '#004736' : 'transparent',
                                            color: activeTab === tab.key ? '#fff' : '#666',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {tab.label} ({tab.count})
                                    </button>
                                ))}
                            </div>

                            {/* Course List */}
                            <div>
                                {filteredCourses.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                                        <i className="fas fa-folder-open" style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.5 }}></i>
                                        <p>ไม่มีคอร์สในหมวดนี้</p>
                                    </div>
                                ) : (
                                    filteredCourses.map((course) => {
                                        const badge = getStatusBadge(course.status);
                                        return (
                                            <div 
                                                key={course.id}
                                                style={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                    padding: '15px',
                                                    borderRadius: '12px',
                                                    marginBottom: '12px',
                                                    background: '#f9fafb',
                                                    transition: 'all 0.2s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#f0fdf4';
                                                    e.currentTarget.style.transform = 'translateX(5px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f9fafb';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}
                                            >
                                                {/* Course Image */}
                                                <div style={{
                                                    width: '80px',
                                                    height: '60px',
                                                    borderRadius: '8px',
                                                    background: '#e0e0e0',
                                                    flexShrink: 0,
                                                    overflow: 'hidden'
                                                }}>
                                                    <img 
                                                        src={course.image} 
                                                        alt={course.title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>

                                                {/* Course Info */}
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div>
                                                            <h5 style={{ margin: '0 0 5px', color: '#333', fontSize: '15px' }}>{course.title}</h5>
                                                            <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>
                                                                <i className="fas fa-user-tie me-1"></i> {course.instructor}
                                                                <span style={{ margin: '0 8px' }}>|</span>
                                                                <i className="fas fa-certificate me-1"></i> {course.cpe} CPE
                                                            </p>
                                                        </div>
                                                        <span style={{
                                                            padding: '4px 10px',
                                                            background: badge.bg,
                                                            color: badge.color,
                                                            borderRadius: '6px',
                                                            fontSize: '11px',
                                                            fontWeight: '500'
                                                        }}>
                                                            {badge.text}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div style={{ marginTop: '10px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '11px', color: '#666' }}>ความคืบหน้า</span>
                                                            <span style={{ fontSize: '11px', color: '#004736', fontWeight: '600' }}>{course.progress}%</span>
                                                        </div>
                                                        <div style={{
                                                            height: '6px',
                                                            background: '#e0e0e0',
                                                            borderRadius: '3px',
                                                            overflow: 'hidden'
                                                        }}>
                                                            <div style={{
                                                                width: `${course.progress}%`,
                                                                height: '100%',
                                                                background: course.progress === 100 
                                                                    ? 'linear-gradient(90deg, #166534, #22c55e)'
                                                                    : 'linear-gradient(90deg, #004736, #00875a)',
                                                                borderRadius: '3px',
                                                                transition: 'width 0.3s ease'
                                                            }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* View All Link */}
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Link 
                                    href="/my-courses"
                                    style={{
                                        color: '#004736',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        fontSize: '14px'
                                    }}
                                >
                                    ดูคอร์สทั้งหมด <i className="fas fa-arrow-right ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileArea;
