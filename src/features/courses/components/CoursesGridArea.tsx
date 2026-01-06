"use client"
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import EnrollButton from '@/components/common/EnrollButton';
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
    { id: 'all', label: 'ทั้งหมด', labelEn: 'All' },
    { id: 'pharmacotherapy', label: 'วิทยาลัยเภสัชบำบัด', labelEn: 'College of Pharmacotherapy' },
    { id: 'consumer-protection', label: 'วิทยาลัยการคุ้มครองผู้บริโภคด้านยาและสุขภาพ', labelEn: 'College of Consumer Health Protection' },
    { id: 'herbal', label: 'วิทยาลัยเภสัชกรรมสมุนไพร', labelEn: 'College of Herbal Pharmacy' },
    { id: 'industrial', label: 'วิทยาลัยเภสัชกรรมอุตสาหการ', labelEn: 'College of Industrial Pharmacy' },
    { id: 'management', label: 'วิทยาลัยการบริหารเภสัชกิจ', labelEn: 'College of Pharmacy Management' },
    { id: 'community', label: 'วิทยาลัยเภสัชกรรมชุมชน', labelEn: 'College of Community Pharmacy' },
    { id: 'precision', label: 'วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่นยำ', labelEn: 'College of Pharmacogenomics & Precision Pharmacy' },
];

const PRICE_RANGES = [
    { label: 'ทุกราคา', labelEn: 'All Prices', min: 0, max: Infinity },
    { label: '0 - 1,000 บาท', labelEn: '0 - 1,000 THB', min: 0, max: 1000 },
    { label: '1,001 - 5,000 บาท', labelEn: '1,001 - 5,000 THB', min: 1001, max: 5000 },
    { label: '5,001+ บาท', labelEn: '5,001+ THB', min: 5001, max: Infinity },
];

const LEVELS = ['All Level', 'Beginner', 'Intermediate', 'Advanced'];

const CoursesGridArea = () => {
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState(0); // index of PRICE_RANGES


    // Filter courses based on search, category, and price range
    const filteredCourses = useMemo(() => {
        const priceRange = PRICE_RANGES[selectedPriceRange];
        return COURSES_DATA.filter((course) => {
            const matchesSearch = searchQuery === '' ||
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || course.category === CATEGORIES.find(c => c.id === selectedCategory)?.label;
            const matchesPrice = course.price >= priceRange.min && course.price <= priceRange.max;
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [searchQuery, selectedCategory, selectedPriceRange]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedPriceRange(0);
    };

    return (
        <>
            <section className="courses-section section-padding fix">
                <div className="container">
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
                                                    <label key={cat.id} className="checkbox-single">
                                                        <span className="d-flex gap-xl-3 gap-2 align-items-center">
                                                            <span className="checkbox-area d-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedCategory === cat.id}
                                                                    onChange={() => setSelectedCategory(cat.id)}
                                                                />
                                                                <span className="checkmark d-center"></span>
                                                            </span>
                                                            <span className="text-color">{language === 'th' ? cat.label : cat.labelEn}</span>
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
                                                <div className="courses-card-main-items" style={{ maxHeight: '380px' }}>
                                                    <div className="courses-card-items" style={{ marginTop: '15px' }}>
                                                        <div className="courses-image">
                                                            <img src={course.image} alt={course.title} style={{ maxHeight: '140px', objectFit: 'cover' }} />
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
                                                    <div className="courses-card-items-hover" style={{
                                                        marginTop: 0,
                                                        padding: '18px 20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <div className="courses-content" style={{ width: '100%' }}>
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
                </div>
            </section>
        </>
    );
};

export default CoursesGridArea;