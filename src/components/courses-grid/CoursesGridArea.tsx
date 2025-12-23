"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useMemo, useEffect } from 'react';
import EnrollButton from '@/components/common/EnrollButton';
import { useSearch, ALL_COURSES } from '@/context/SearchContext';

// Use courses data from context  
const COURSES_DATA = ALL_COURSES.map((course, index) => ({
    ...course,
    titleEn: course.titleEn,
    categoryEn: course.category,
    cpe: [2.5, 3.0, 2.0, 3.5, 2.5, 3.0, 4.0, 3.5, 2.0, 4.5][index] || 2.5,
    level: ['Beginner', 'Intermediate', 'All Level', 'Intermediate', 'Beginner', 'Intermediate', 'Advanced', 'Advanced', 'Beginner', 'Advanced'][index] || 'All Level',
    rating: [4.8, 4.9, 4.7, 4.6, 4.5, 4.8, 4.9, 4.7, 4.6, 4.8][index] || 4.5,
    students: [245, 189, 312, 156, 198, 220, 175, 134, 289, 167][index] || 100,
    duration: ['6 ชั่วโมง', '8 ชั่วโมง', '4 ชั่วโมง', '10 ชั่วโมง', '5 ชั่วโมง', '7 ชั่วโมง', '12 ชั่วโมง', '15 ชั่วโมง', '3 ชั่วโมง', '20 ชั่วโมง'][index] || '5 ชั่วโมง',
    description: course.title,
}));

const CATEGORIES = [
    'ทั้งหมด',
    'วิทยาลัยเภสัชบำบัด',
    'วิทยาลัยการคุ้มครองผู้บริโภคด้านยา',
    'วิทยาลัยแพทย์รวมสมุนไพร',
    'วิทยาลัยเภสัชกรรมอุตสาหการ',
    'วิทยาลัยเภสัชกรรมชุมชน',
    'วิทยาลัยการบริหารเภสัชกิจ',
    'วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่และเด็ก'
];
const LEVELS = ['All Level', 'Beginner', 'Intermediate', 'Advanced'];

// Price ranges
const PRICE_RANGES = [
    { value: 'all', label: 'ทุกราคา', min: 0, max: Infinity },
    { value: '0-1000', label: '0 - 1,000 บาท', min: 0, max: 1000 },
    { value: '1001-5000', label: '1,001 - 5,000 บาท', min: 1001, max: 5000 },
    { value: '5001+', label: '5,001+ บาท', min: 5001, max: Infinity },
];

const CoursesGridArea = () => {
    const searchParams = useSearchParams();
    const { searchQuery, setSearchQuery, selectedPriceRange, setSelectedPriceRange } = useSearch();
    
    const [localSearch, setLocalSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
    const [selectedLevel, setSelectedLevel] = useState('All Level');
    const [activeTab, setActiveTab] = useState<'explore' | 'my'>('explore');

    // Sync search from URL params
    useEffect(() => {
        const urlSearch = searchParams.get('search');
        if (urlSearch) {
            setSearchQuery(urlSearch);
            setLocalSearch(urlSearch);
        }
    }, [searchParams, setSearchQuery]);

    // Sync local search with context
    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    // Filter courses based on search, category, level, and price
    const filteredCourses = useMemo(() => {
        const priceRange = PRICE_RANGES.find(p => p.value === selectedPriceRange) || PRICE_RANGES[0];
        
        return COURSES_DATA.filter((course) => {
            const matchesSearch = localSearch === '' ||
                course.title.toLowerCase().includes(localSearch.toLowerCase()) ||
                course.titleEn.toLowerCase().includes(localSearch.toLowerCase()) ||
                course.instructor.toLowerCase().includes(localSearch.toLowerCase());
            const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
            const matchesLevel = selectedLevel === 'All Level' || course.level === selectedLevel;
            const matchesPrice = course.price >= priceRange.min && course.price <= priceRange.max;
            return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
        });
    }, [localSearch, selectedCategory, selectedLevel, selectedPriceRange]);

    const clearFilters = () => {
        setLocalSearch('');
        setSearchQuery('');
        setSelectedCategory('ทั้งหมด');
        setSelectedLevel('All Level');
        setSelectedPriceRange('all');
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
                                    <Link
                                        href="/my-courses"
                                        style={{
                                            padding: '12px 28px',
                                            border: '2px solid #004736',
                                            borderRadius: '8px',
                                            background: '#004736',
                                            color: '#fff',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        My Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="breadcrumb-nav mt-3" style={{ fontSize: '14px', color: '#666' }}>
                            {activeTab === 'explore' ? 'Explore Courses' : 'My Course'} /
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
                                                <h5>ค้นหา</h5>
                                            </div>
                                            <div className="search-widget">
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <input
                                                        type="text"
                                                        placeholder="ค้นหาคอร์ส..."
                                                        value={localSearch}
                                                        onChange={(e) => {
                                                            setLocalSearch(e.target.value);
                                                            setSearchQuery(e.target.value);
                                                        }}
                                                        style={{ color: '#333' }}
                                                    />
                                                    <button type="submit"><i className="fal fa-search"></i></button>
                                                </form>
                                            </div>
                                        </div>

                                        {/* Price Filter */}
                                        <div className="courses-sidebar-items">
                                            <div className="wid-title">
                                                <h5>ช่วงราคา</h5>
                                            </div>
                                            <div className="courses-list">
                                                {PRICE_RANGES.map((range) => (
                                                    <label key={range.value} className="checkbox-single">
                                                        <span className="d-flex gap-xl-3 gap-2 align-items-center">
                                                            <span className="checkbox-area d-center">
                                                                <input
                                                                    type="radio"
                                                                    name="priceRange"
                                                                    checked={selectedPriceRange === range.value}
                                                                    onChange={() => setSelectedPriceRange(range.value)}
                                                                />
                                                                <span className="checkmark d-center"></span>
                                                            </span>
                                                            <span className="text-color">{range.label}</span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="courses-sidebar-items">
                                            <div className="wid-title">
                                                <h5>หมวดหมู่</h5>
                                            </div>
                                            <div className="courses-list">
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
                                    <button onClick={clearFilters} className="theme-btn">
                                        <i className="far fa-times-circle"></i> ล้างตัวกรอง
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
                                        <h5>แสดง <span>1-{filteredCourses.length}</span> จาก <span>{COURSES_DATA.length}</span> คอร์ส</h5>
                                    </div>
                                </div>

                                {filteredCourses.length === 0 ? (
                                    <div className="no-results text-center py-5">
                                        <i className="fas fa-search" style={{ fontSize: '48px', color: '#ddd', marginBottom: '20px' }}></i>
                                        <h5 style={{ color: '#666' }}>ไม่พบคอร์สที่ตรงกับเงื่อนไข</h5>
                                        <p style={{ color: '#999' }}>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
                                        <button onClick={clearFilters} className="theme-btn mt-3">ดูคอร์สทั้งหมด</button>
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
                                                                    {course.students} คน
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
                                                                    {course.students} คน
                                                                </li>
                                                            </ul>
                                                            <EnrollButton courseId={course.id} className="theme-btn yellow-btn">สมัครเรียน</EnrollButton>
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
                        <div className="my-courses-content text-center py-5">
                            <i className="fas fa-graduation-cap" style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }}></i>
                            <h4 style={{ color: '#333', marginBottom: '12px' }}>ยังไม่มีคอร์สของคุณ</h4>
                            <p style={{ color: '#666', marginBottom: '24px' }}>เริ่มเรียนรู้ได้เลยโดยการสมัครคอร์สที่สนใจ</p>
                            <button
                                onClick={() => setActiveTab('explore')}
                                className="theme-btn"
                                style={{ padding: '12px 32px' }}
                            >
                                ค้นหาคอร์สเรียน
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CoursesGridArea;