"use client"
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import EnrollButton from '@/components/common/EnrollButton';
import { useAuth } from '@/features/auth';
import { useLanguage } from '@/context/LanguageContext';

// Sample pharmacy courses data with images
const COURSES_DATA = [
    {
        id: 1,
        title: 'เภสัชวิทยาคลินิกเบื้องต้น',
        titleEn: 'Clinical Pharmacology Basics',
        category: 'เภสัชวิทยา',
        categoryEn: 'Pharmacology',
        instructor: 'ภก.สมชาย ใจดี',
        cpe: 2.5,
        price: 1500,
        level: 'Beginner',
        rating: 4.8,
        students: 245,
        duration: '6 ชั่วโมง',
        image: 'assets/img/courses/01.jpg',
        description: 'เรียนรู้หลักการเภสัชวิทยาคลินิกขั้นพื้นฐาน การออกฤทธิ์ของยา และผลข้างเคียง',
    },
    {
        id: 2,
        title: 'การบริบาลผู้ป่วยเบาหวาน',
        titleEn: 'Diabetes Patient Care',
        category: 'การบริบาลเภสัชกรรม',
        categoryEn: 'Pharmaceutical Care',
        instructor: 'ภก.วิชัย สุขใจ',
        cpe: 3.0,
        price: 1800,
        level: 'Intermediate',
        rating: 4.9,
        students: 189,
        duration: '8 ชั่วโมง',
        image: 'assets/img/courses/02.jpg',
        description: 'แนวทางการดูแลผู้ป่วยเบาหวาน การปรับขนาดยา และการให้คำปรึกษา',
    },
    {
        id: 3,
        title: 'กฎหมายเภสัชกรรม',
        titleEn: 'Pharmacy Law',
        category: 'กฎหมายและจริยธรรม',
        categoryEn: 'Law & Ethics',
        instructor: 'ภก.ประสิทธิ์ นิติกร',
        cpe: 2.0,
        price: 1200,
        level: 'All Level',
        rating: 4.7,
        students: 312,
        duration: '4 ชั่วโมง',
        image: 'assets/img/courses/03.jpg',
        description: 'ความรู้ด้านกฎหมายเภสัชกรรมและจรรยาบรรณวิชาชีพ',
    },
    {
        id: 4,
        title: 'ยาปฏิชีวนะในทางปฏิบัติ',
        titleEn: 'Antibiotics in Practice',
        category: 'เภสัชวิทยา',
        categoryEn: 'Pharmacology',
        instructor: 'ภก.สุวรรณา เภสัชกร',
        cpe: 3.5,
        price: 2000,
        level: 'Intermediate',
        rating: 4.6,
        students: 156,
        duration: '10 ชั่วโมง',
        image: 'assets/img/courses/04.jpg',
        description: 'การเลือกใช้ยาปฏิชีวนะอย่างเหมาะสม และปัญหาเชื้อดื้อยา',
    },
    {
        id: 5,
        title: 'การจัดการร้านยา',
        titleEn: 'Pharmacy Management',
        category: 'บริหารเภสัชกิจ',
        categoryEn: 'Pharmacy Business',
        instructor: 'ภก.นภา ธุรกิจดี',
        cpe: 2.5,
        price: 1600,
        level: 'Beginner',
        rating: 4.5,
        students: 198,
        duration: '5 ชั่วโมง',
        image: 'assets/img/courses/05.jpg',
        description: 'เทคนิคการบริหารจัดการร้านยา สต็อกสินค้า และการบริการ',
    },
];

const CATEGORIES = [
    'ทั้งหมด',
    'วิทยาลัยเภสัชบำบัด ',
    'วิทยาลัยการคุ้มครองผู้บริโภคด้านยา',
    'วิทยาลัยแพทย์รวมสมุนไพร ',
    'วิทยาลัยเภสัชกรรมอุตสาหการ ',
    'วิทยาลัยเภสัชกรรมชุมชน',
    'วิทยาลัยการบริหารเภสัชกิจ ',
    'วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่และเด็ก',
];

const PRICE_RANGES = [
    { label: 'ทุกราคา', labelEn: 'All Prices', min: 0, max: Infinity },
    { label: '0 - 1,000 บาท', labelEn: '0 - 1,000 THB', min: 0, max: 1000 },
    { label: '1,001 - 5,000 บาท', labelEn: '1,001 - 5,000 THB', min: 1001, max: 5000 },
    { label: '5,001+ บาท', labelEn: '5,001+ THB', min: 5001, max: Infinity },
];

const LEVELS = ['All Level', 'Beginner', 'Intermediate', 'Advanced'];

// Mock enrolled courses for logged-in users
const ENROLLED_COURSES = [
    {
        id: 1,
        title: 'เภสัชวิทยาคลินิกเบื้องต้น',
        instructor: 'ภก.สมชาย ใจดี',
        cpe: 2.5,
        duration: '6 ชั่วโมง',
        image: 'assets/img/courses/01.jpg',
        progress: 65,
        completedLessons: 8,
        totalLessons: 12,
        lastAccessed: '2024-12-20',
        status: 'in_progress' as const,
    },
    {
        id: 2,
        title: 'การบริบาลผู้ป่วยเบาหวาน',
        instructor: 'ภก.วิชัย สุขใจ',
        cpe: 3.0,
        duration: '8 ชั่วโมง',
        image: 'assets/img/courses/02.jpg',
        progress: 100,
        completedLessons: 15,
        totalLessons: 15,
        lastAccessed: '2024-12-18',
        status: 'completed' as const,
    },
    {
        id: 4,
        title: 'ยาปฏิชีวนะในทางปฏิบัติ',
        instructor: 'ภก.สุวรรณา เภสัชกร',
        cpe: 3.5,
        duration: '10 ชั่วโมง',
        image: 'assets/img/courses/04.jpg',
        progress: 20,
        completedLessons: 3,
        totalLessons: 15,
        lastAccessed: '2024-12-22',
        status: 'in_progress' as const,
    },
];

const CoursesGridArea = () => {
    const { isAuthenticated } = useAuth();
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
    const [selectedPriceRange, setSelectedPriceRange] = useState(0); // index of PRICE_RANGES
    const [activeTab, setActiveTab] = useState<'explore' | 'my'>('explore');

    // Handle URL tab parameter on client side
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab');
            if (tab === 'my') {
                setActiveTab('my');
            }
        }
    }, []);

    // Filter courses based on search, category, and price range
    const filteredCourses = useMemo(() => {
        const priceRange = PRICE_RANGES[selectedPriceRange];
        return COURSES_DATA.filter((course) => {
            const matchesSearch = searchQuery === '' ||
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
            const matchesPrice = course.price >= priceRange.min && course.price <= priceRange.max;
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [searchQuery, selectedCategory, selectedPriceRange]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('ทั้งหมด');
        setSelectedPriceRange(0);
    };

    return (
        <>
            <section className="courses-section section-padding fix">
                <div className="container">
                    {/* Header with Tabs */}
                    <div className="courses-header mb-4">
                        <div className="row align-items-center g-3">
                            <div className="col-lg-12">
                                <div className="tab-buttons d-flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('my')}
                                        style={{
                                            padding: '12px 28px',
                                            border: activeTab === 'my' ? 'none' : '1px solid #ddd',
                                            borderRadius: '8px',
                                            background: activeTab === 'my' ? '#4F46E5' : '#fff',
                                            color: activeTab === 'my' ? '#fff' : '#333',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {t('คอร์สของฉัน', 'My Courses')}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('explore')}
                                        style={{
                                            padding: '12px 28px',
                                            border: activeTab === 'explore' ? 'none' : '1px solid #ddd',
                                            borderRadius: '8px',
                                            background: activeTab === 'explore' ? '#4F46E5' : '#fff',
                                            color: activeTab === 'explore' ? '#fff' : '#333',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {t('สำรวจคอร์ส', 'Explore Courses')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="breadcrumb-nav mt-3" style={{ fontSize: '14px', color: '#666' }}>
                            {activeTab === 'explore' ? t('สำรวจคอร์ส', 'Explore Courses') : t('คอร์สของฉัน', 'My Courses')} /
                        </div>
                    </div>

                    {activeTab === 'explore' ? (
                        <div className="row g-4">
                            {/* Sidebar Filters */}
                            <div className="col-xl-3 col-lg-4">
                                <div className="courses-main-sidebar-area">
                                    <div className="courses-main-sidebar">
                                        {/* Search */}
                                        <div className="courses-sidebar-items">
                                            <div className="wid-title style-2">
                                                <h5>{t('ค้นหา', 'Search')}</h5>
                                            </div>
                                            <div className="search-widget">
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <input
                                                        type="text"
                                                        placeholder={t('ค้นหาคอร์สเรียน', 'Search courses')}
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        style={{ color: '#333' }}
                                                    />
                                                    <button type="submit"><i className="fal fa-search"></i></button>
                                                </form>
                                            </div>
                                        </div>

                                        {/* Price Range Filter */}
                                        <div className="courses-sidebar-items">
                                            <div className="wid-title">
                                                <h5>{t('ช่วงราคา', 'Price Range')}</h5>
                                            </div>
                                            <div className="courses-list">
                                                {PRICE_RANGES.map((range, index) => (
                                                    <label key={index} className="checkbox-single">
                                                        <span className="d-flex gap-xl-3 gap-2 align-items-center">
                                                            <span className="checkbox-area d-center">
                                                                <input
                                                                    type="radio"
                                                                    name="priceRange"
                                                                    checked={selectedPriceRange === index}
                                                                    onChange={() => setSelectedPriceRange(index)}
                                                                />
                                                                <span className="checkmark d-center"></span>
                                                            </span>
                                                            <span className="text-color">
                                                                {language === 'th' ? range.label : range.labelEn}
                                                            </span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="courses-sidebar-items">
                                            <div className="wid-title">
                                                <h5>{t('หมวดหมู่', 'Category')}</h5>
                                            </div>
                                            <div className="courses-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {CATEGORIES.map((cat) => (
                                                    <label key={cat} className="checkbox-single">
                                                        <span className="d-flex gap-xl-3 gap-2 align-items-center">
                                                            <span className="checkbox-area d-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedCategory === cat}
                                                                    onChange={() => setSelectedCategory(cat)}
                                                                />
                                                                <span className="checkmark d-center"></span>
                                                            </span>
                                                            <span className="text-color">{cat}</span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={clearFilters} className="theme-btn" style={{ width: '100%' }}>
                                        <i className="far fa-times-circle me-2"></i>{t('ล้างตัวกรอง', 'Clear Filters')}
                                    </button>
                                </div>
                            </div>

                            {/* Courses Grid */}
                            <div className="col-xl-9 col-lg-8">
                                <div className="coureses-notices-wrapper">
                                    <div className="courses-showing">
                                        <div className="icon-items">
                                            <Link href="/courses-grid"><i className="fas fa-th"></i></Link>
                                        </div>
                                        <h5>{t('แสดง', 'Showing')} <span>1-{filteredCourses.length}</span> {t('จาก', 'of')} <span>{COURSES_DATA.length}</span> {t('คอร์ส', 'Courses')}</h5>
                                    </div>
                                </div>

                                {filteredCourses.length === 0 ? (
                                    <div className="no-results text-center py-5">
                                        <i className="fas fa-search" style={{ fontSize: '48px', color: '#ddd', marginBottom: '20px' }}></i>
                                        <h5 style={{ color: '#666' }}>{t('ไม่พบคอร์สที่ตรงกับเงื่อนไข', 'No courses match your criteria')}</h5>
                                        <p style={{ color: '#999' }}>{t('ลองเปลี่ยนคำค้นหาหรือตัวกรอง', 'Try changing your search or filters')}</p>
                                        <button onClick={clearFilters} className="theme-btn mt-3">{t('ดูคอร์สทั้งหมด', 'View All Courses')}</button>
                                    </div>
                                ) : (
                                    <div className="row">
                                        {filteredCourses.map((course) => (
                                            <div key={course.id} className="col-xl-4 col-lg-6 col-md-6">
                                                <div className="courses-card-main-items">
                                                    <div className="courses-card-items">
                                                        <div className="courses-image">
                                                            <img src={course.image} alt={course.title} />
                                                            <h3 className="courses-title">{course.categoryEn}</h3>
                                                            <h4 className="topic-title">{course.cpe} CPE</h4>
                                                            <div className="arrow-items">
                                                                <div className="GlidingArrow">
                                                                    <img src="assets/img/courses/a1.png" alt="img" />
                                                                </div>
                                                                <div className="GlidingArrow delay1">
                                                                    <img src="assets/img/courses/a2.png" alt="img" />
                                                                </div>
                                                                <div className="GlidingArrow delay2">
                                                                    <img src="assets/img/courses/a3.png" alt="img" />
                                                                </div>
                                                                <div className="GlidingArrow delay3">
                                                                    <img src="assets/img/courses/a4.png" alt="img" />
                                                                </div>
                                                                <div className="GlidingArrow delay4">
                                                                    <img src="assets/img/courses/a5.png" alt="img" />
                                                                </div>
                                                                <div className="GlidingArrow delay5">
                                                                    <img src="assets/img/courses/a6.png" alt="img" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="courses-content">
                                                            <ul className="post-cat">
                                                                <li>
                                                                    <Link href="/courses-grid">{course.category}</Link>
                                                                </li>
                                                                <li>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                </li>
                                                            </ul>
                                                            <h5>
                                                                <Link href="/courses-details">{course.title}</Link>
                                                            </h5>
                                                            <div className="client-items">
                                                                <div className="client-img bg-cover" style={{ background: `url(/assets/img/courses/client-1.png)` }}></div>
                                                                <p>{course.instructor}</p>
                                                            </div>
                                                            <ul className="post-class">
                                                                <li>
                                                                    <i className="far fa-clock"></i>
                                                                    {course.duration}
                                                                </li>
                                                                <li>
                                                                    <i className="far fa-user"></i>
                                                                    {course.students} {t('คน', 'students')}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="courses-card-items-hover">
                                                        <div className="courses-content">
                                                            <ul className="post-cat">
                                                                <li>
                                                                    <Link href="/courses-grid">{course.category}</Link>
                                                                </li>
                                                                <li>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                    <i className="fas fa-star"></i>
                                                                </li>
                                                            </ul>
                                                            <h5>
                                                                <Link href="/courses-details">{course.title}</Link>
                                                            </h5>
                                                            <h4>฿{course.price.toLocaleString()}</h4>
                                                            <span>{course.description}</span>
                                                            <div className="client-items">
                                                                <div className="client-img bg-cover" style={{ background: `url(/assets/img/courses/client-1.png)` }}></div>
                                                                <p>{course.instructor}</p>
                                                            </div>
                                                            <ul className="post-class">
                                                                <li>
                                                                    <i className="far fa-clock"></i>
                                                                    {course.duration}
                                                                </li>
                                                                <li>
                                                                    <i className="far fa-user"></i>
                                                                    {course.students} {t('คน', 'students')}
                                                                </li>
                                                            </ul>
                                                            <EnrollButton courseId={course.id} className="theme-btn yellow-btn">{t('สมัครเรียน', 'Enroll Now')}</EnrollButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* My Courses Tab */
                        <div className="my-courses-content">
                            {isAuthenticated && ENROLLED_COURSES.length > 0 ? (
                                <>
                                    {/* Stats Summary */}
                                    <div className="row mb-4">
                                        <div className="col-md-4 mb-3">
                                            <div style={{
                                                background: 'linear-gradient(135deg, #e8f8f4 0%, #d1fae5 100%)',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                textAlign: 'center',
                                            }}>
                                                <h3 style={{ color: '#014D40', marginBottom: '4px' }}>{ENROLLED_COURSES.length}</h3>
                                                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{t('คอร์สทั้งหมด', 'All Courses')}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div style={{
                                                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                textAlign: 'center',
                                            }}>
                                                <h3 style={{ color: '#92400e', marginBottom: '4px' }}>
                                                    {ENROLLED_COURSES.filter(c => c.status === 'in_progress').length}
                                                </h3>
                                                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{t('กำลังเรียน', 'In Progress')}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div style={{
                                                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                textAlign: 'center',
                                            }}>
                                                <h3 style={{ color: '#1e40af', marginBottom: '4px' }}>
                                                    {ENROLLED_COURSES.filter(c => c.status === 'completed').length}
                                                </h3>
                                                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{t('เรียนจบแล้ว', 'Completed')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enrolled Courses Grid */}
                                    <div className="row">
                                        {ENROLLED_COURSES.map((course) => (
                                            <div key={course.id} className="col-xl-4 col-lg-6 mb-4">
                                                <div style={{
                                                    background: '#fff',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                                    transition: 'all 0.3s ease',
                                                }}>
                                                    {/* Course Image */}
                                                    <div style={{ position: 'relative' }}>
                                                        <img
                                                            src={course.image}
                                                            alt={course.title}
                                                            style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                                        />
                                                        {/* Status Badge */}
                                                        <span style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            right: '12px',
                                                            padding: '6px 12px',
                                                            borderRadius: '20px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            background: course.status === 'completed' ? '#22c55e' : '#f59e0b',
                                                            color: '#fff',
                                                        }}>
                                                            {course.status === 'completed' ? t('✓ เรียนจบแล้ว', '✓ Completed') : t('📖 กำลังเรียน', '📖 In Progress')}
                                                        </span>
                                                    </div>

                                                    {/* Course Info */}
                                                    <div style={{ padding: '20px' }}>
                                                        <h5 style={{
                                                            color: '#014D40',
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                            marginBottom: '8px',
                                                            lineHeight: '1.4',
                                                        }}>
                                                            {course.title}
                                                        </h5>
                                                        <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
                                                            <i className="fas fa-user-tie" style={{ marginRight: '6px' }}></i>
                                                            {course.instructor}
                                                        </p>

                                                        {/* Progress Bar */}
                                                        <div style={{ marginBottom: '12px' }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                marginBottom: '6px',
                                                            }}>
                                                                <span style={{ fontSize: '13px', color: '#666' }}>
                                                                    {course.completedLessons}/{course.totalLessons} {t('บทเรียน', 'Lessons')}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '13px',
                                                                    fontWeight: '600',
                                                                    color: course.progress === 100 ? '#22c55e' : '#014D40',
                                                                }}>
                                                                    {course.progress}%
                                                                </span>
                                                            </div>
                                                            <div style={{
                                                                height: '8px',
                                                                background: '#e5e7eb',
                                                                borderRadius: '4px',
                                                                overflow: 'hidden',
                                                            }}>
                                                                <div style={{
                                                                    width: `${course.progress}%`,
                                                                    height: '100%',
                                                                    background: course.progress === 100
                                                                        ? 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)'
                                                                        : 'linear-gradient(90deg, #014D40 0%, #40C7A9 100%)',
                                                                    borderRadius: '4px',
                                                                    transition: 'width 0.5s ease',
                                                                }}></div>
                                                            </div>
                                                        </div>

                                                        {/* Meta Info */}
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '16px',
                                                            marginBottom: '16px',
                                                            paddingTop: '12px',
                                                            borderTop: '1px solid #f0f0f0',
                                                        }}>
                                                            <span style={{ fontSize: '12px', color: '#666' }}>
                                                                <i className="fas fa-clock" style={{ marginRight: '4px', color: '#40C7A9' }}></i>
                                                                {course.duration}
                                                            </span>
                                                            <span style={{ fontSize: '12px', color: '#666' }}>
                                                                <i className="fas fa-certificate" style={{ marginRight: '4px', color: '#40C7A9' }}></i>
                                                                {course.cpe} CPE
                                                            </span>
                                                        </div>

                                                        {/* Continue Button */}
                                                        <Link
                                                            href={`/course-learning?id=${course.id}`}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '8px',
                                                                width: '100%',
                                                                padding: '12px',
                                                                background: course.status === 'completed'
                                                                    ? 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)'
                                                                    : 'linear-gradient(135deg, #014D40 0%, #006B5A 100%)',
                                                                color: '#fff',
                                                                borderRadius: '10px',
                                                                textDecoration: 'none',
                                                                fontWeight: '600',
                                                                fontSize: '14px',
                                                                transition: 'all 0.3s ease',
                                                            }}
                                                        >
                                                            {course.status === 'completed' ? (
                                                                <><i className="fas fa-redo"></i> {t('เรียนซ้ำ', 'Retake')}</>
                                                            ) : (
                                                                <><i className="fas fa-play"></i> {t('เรียนต่อ', 'Continue')}</>
                                                            )}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="fas fa-graduation-cap" style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }}></i>
                                    <h4 style={{ color: '#333', marginBottom: '12px' }}>{t('ยังไม่มีคอร์สของคุณ', 'You have no courses yet')}</h4>
                                    <p style={{ color: '#666', marginBottom: '24px' }}>
                                        {isAuthenticated
                                            ? t('เริ่มเรียนรู้ได้เลยโดยการสมัครคอร์สที่สนใจ', 'Start learning by enrolling in courses you are interested in')
                                            : t('กรุณาเข้าสู่ระบบเพื่อดูคอร์สของคุณ', 'Please log in to view your courses')
                                        }
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('explore')}
                                        className="theme-btn"
                                        style={{ padding: '12px 32px' }}
                                    >
                                        {t('ค้นหาคอร์สเรียน', 'Find Courses')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CoursesGridArea;