"use client"

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/features/i18n';

const FooterTwo = () => {
    const { t } = useLanguage();

    return (
        <>
            <footer className="footer-section fix footer-bg">
                <div className="big-circle">
                    <img src="assets/img/footer/big-circle.png" alt="img" />
                </div>
                <div className="circle-shape-2">
                    <img src="assets/img/footer/circle-2.png" alt="img" />
                </div>
                <div className="Vector-shape-2">
                    <img src="assets/img/footer/Vector-2.png" alt="img" />
                </div>
                <div className="container">
                    <div className="footer-banner-items">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="footer-banner">
                                    <div className="content">
                                        <h3 className="wow fadeInUp">{t('ลงทะเบียน', 'Register')}</h3>
                                        <p className="wow fadeInUp" data-wow-delay=".3s">
                                            {t(
                                                'ลงทะเบียนเรียนกับเรา เพิ่มพูนความรู้และประสบการณ์ด้านเภสัชกรรม',
                                                'Register with us to enhance your pharmacy knowledge and experience'
                                            )}
                                        </p>
                                        <Link href="/register" className="theme-btn wow fadeInUp" data-wow-delay=".5s">
                                            {t('ลงทะเบียน', 'Register')}
                                        </Link>
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/boy-img-2.png" alt="img" className="wow fadeInUp" data-wow-delay="0.7s" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="footer-banner style-2">
                                    <div className="content">
                                        <h3 className="wow fadeInUp">{t('เริ่มเรียนกับเรา', 'Start Learning')}</h3>
                                        <p className="wow fadeInUp" data-wow-delay=".3s">
                                            {t(
                                                'สะสมหน่วยกิต CPE ได้ง่ายๆ กับคอร์สออนไลน์คุณภาพ',
                                                'Easily accumulate CPE credits with quality online courses'
                                            )}
                                        </p>
                                        <Link href="/courses-grid" className="theme-btn wow fadeInUp" data-wow-delay=".5s">
                                            {t('ดูคอร์สทั้งหมด', 'View All Courses')}
                                        </Link>
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/boy-img-3.png" alt="img" className="wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-widget-wrapper">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <Link href="/">
                                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Pharmacy Academy</span>
                                        </Link>
                                    </div>
                                    <div className="footer-content">
                                        <p>
                                            {t(
                                                'ศูนย์การเรียนรู้ออนไลน์สำหรับเภสัชกร สะสมหน่วยกิตการศึกษาต่อเนื่อง (CPE) ได้ง่ายๆ',
                                                'Online learning center for pharmacists. Easily accumulate Continuing Education (CPE) credits'
                                            )}
                                        </p>
                                        <div className="social-icon">
                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#"><i className="fab fa-line"></i></a>
                                            <a href="#"><i className="fab fa-youtube"></i></a>
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>{t('หมวดหมู่คอร์ส', 'Course Categories')}</h3>
                                    </div>
                                    <ul className="list-area">
                                        <li><Link href="/courses-grid">{t('วิทยาลัยเภสัชบำบัด', 'The College of Pharmcotherapy')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยการคุ้มครองผู้บริโภคด้านยาและสุขภาพ', 'The College of Pharmaceutical and Health Consumer Protection')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยเภสัชกรรมสมุนไพร', 'The College of Herbal Pharmacy')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยเภสัชกรรมอุตสาหการ', 'The College of Industrial Pharmacy')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยการบริหารเภสัชกิจ', 'The College of Community Pharmacy')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยเภสัชกรรมชุมชน', 'The College of Pharmacy Adimnistration')}</Link></li>
                                        <li><Link href="/courses-grid">{t('วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่นยำ', 'The College of Pharmacogenomics and Precision Medicine')}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp" data-wow-delay=".6s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>{t('ลิงก์ด่วน', 'Quick Links')}</h3>
                                    </div>
                                    <ul className="list-area">
                                        <li><Link href="/">{t('หน้าแรก', 'Home')}</Link></li>
                                        <li><Link href="/courses-grid">{t('คอร์สทั้งหมด', 'All Courses')}</Link></li>
                                        <li><Link href="/shop-cart">{t('ตะกร้าสินค้า', 'Cart')}</Link></li>
                                        <li><Link href="#">{t('เกี่ยวกับเรา', 'About Us')}</Link></li>
                                        <li><Link href="#">{t('คำถามที่พบบ่อย', 'FAQ')}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp" data-wow-delay=".8s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>{t('ติดต่อเรา', 'Contact Us')}</h3>
                                    </div>
                                    <div className="footer-content">
                                        <ul className="contact-info">
                                            <li>
                                                {t('สถาบันเภสัชกรรม', 'Pharmacy Institute')}
                                                <br />
                                                {t('กรุงเทพมหานคร, ประเทศไทย', 'Bangkok, Thailand')}
                                            </li>
                                            <li>
                                                <a href="mailto:info@pharmacyacademy.com" className="link">info@pharmacyacademy.com</a>
                                            </li>
                                            <li>
                                                <a href="tel:+6621234567">+66 2 123 4567</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom style-2">
                        <p>{t('สงวนลิขสิทธิ์', 'Copyright')} © <Link href="/">Pharmacy Academy</Link></p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterTwo;