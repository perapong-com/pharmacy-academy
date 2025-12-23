
import Link from 'next/link';
import React from 'react';

const FooterTwo = () => {
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
                                        <h3 className="wow fadeInUp">เป็นวิทยากร</h3>
                                        <p className="wow fadeInUp" data-wow-delay=".3s">
                                            ร่วมเป็นวิทยากรกับเรา แบ่งปันความรู้และประสบการณ์ด้านเภสัชกรรม
                                        </p>
                                        <Link href="#" className="theme-btn wow fadeInUp" data-wow-delay=".5s">สมัครเป็นวิทยากร</Link>
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/boy-img-2.png" alt="img" className="wow fadeInUp" data-wow-delay="0.7s" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="footer-banner style-2">
                                    <div className="content">
                                        <h3 className="wow fadeInUp">เริ่มเรียนกับเรา</h3>
                                        <p className="wow fadeInUp" data-wow-delay=".3s">
                                            สะสมหน่วยกิต CPE ได้ง่ายๆ กับคอร์สออนไลน์คุณภาพ
                                        </p>
                                        <Link href="/courses-grid" className="theme-btn wow fadeInUp" data-wow-delay=".5s">ดูคอร์สทั้งหมด</Link>
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/boy-img-3.png" alt="img" className="wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-widget-wrapper">
                        <div className="row align-items-start">
                            <div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3><Link href="/" style={{ color: '#fff' }}>Pharmacy Academy</Link></h3>
                                    </div>
                                    <div className="footer-content">
                                        <p>
                                            ศูนย์การเรียนรู้ออนไลน์สำหรับเภสัชกร สะสมหน่วยกิตการศึกษาต่อเนื่อง (CPE) ได้ง่ายๆ
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
                            <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>หมวดหมู่คอร์ส</h3>
                                    </div>
                                    <ul className="list-area" style={{ fontSize: '13px' }}>
                                        <li><Link href="/courses-grid">วิทยาลัยเภสัชบำบัด</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยการคุ้มครองผู้บริโภคด้านยา</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยแพทย์รวมสมุนไพร</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยเภสัชกรรมอุตสาหการ</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยเภสัชกรรมชุมชน</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยการบริหารเภสัชกิจ</Link></li>
                                        <li><Link href="/courses-grid">วิทยาลัยเภสัชพันธุศาสตร์ฯ</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>ลิงก์ด่วน</h3>
                                    </div>
                                    <ul className="list-area">
                                        <li><Link href="/">หน้าแรก</Link></li>
                                        <li><Link href="/courses-grid">คอร์สทั้งหมด</Link></li>
                                        <li><Link href="/shop-cart">ตะกร้าสินค้า</Link></li>
                                        <li><Link href="/about_us">เกี่ยวกับเรา</Link></li>
                                        <li><Link href="#">คำถามที่พบบ่อย</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                                <div className="single-footer-widget">
                                    <div className="widget-head">
                                        <h3>ติดต่อสภาเภสัชกรรม</h3>
                                    </div>
                                    <div className="footer-content">
                                        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                                            {/* Address */}
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '12px', 
                                                alignItems: 'flex-start',
                                                flex: '1',
                                                minWidth: '250px'
                                            }}>
                                                <i className="fas fa-map-marker-alt" style={{ 
                                                    color: '#fff', 
                                                    fontSize: '16px',
                                                    marginTop: '4px',
                                                    flexShrink: 0
                                                }}></i>
                                                <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#fff' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>สำนักงานเลขาธิการสภาเภสัชกรรม</strong>
                                                    อาคารมหิตลาธิเบศร ชั้น 8 กระทรวงสาธารณสุข<br />
                                                    เลขที่ 88/19 หมู่ 4 ถนนติวานนท์<br />
                                                    ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000
                                                </div>
                                            </div>

                                            {/* Contact Info */}
                                            <div style={{ flex: '1', minWidth: '200px' }}>
                                                {/* Phone */}
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '12px', 
                                                    marginBottom: '12px',
                                                    alignItems: 'center'
                                                }}>
                                                    <i className="fas fa-phone" style={{ 
                                                        color: '#fff', 
                                                        fontSize: '14px',
                                                        flexShrink: 0
                                                    }}></i>
                                                    <div style={{ fontSize: '14px', color: '#fff' }}>
                                                        <a href="tel:025919992" style={{ color: '#fff' }}>0 2591 9992</a>
                                                        <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '5px' }}>(คู่สายอัตโนมัติ)</span>
                                                    </div>
                                                </div>

                                                {/* Fax */}
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '12px', 
                                                    marginBottom: '12px',
                                                    alignItems: 'center'
                                                }}>
                                                    <i className="fas fa-fax" style={{ 
                                                        color: '#fff', 
                                                        fontSize: '14px',
                                                        flexShrink: 0
                                                    }}></i>
                                                    <div style={{ fontSize: '14px', color: '#fff' }}>
                                                        โทรสาร: 0 2591 9996
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '12px', 
                                                    marginBottom: '15px',
                                                    alignItems: 'center'
                                                }}>
                                                    <i className="fas fa-envelope" style={{ 
                                                        color: '#fff', 
                                                        fontSize: '14px',
                                                        flexShrink: 0
                                                    }}></i>
                                                    <div style={{ fontSize: '14px' }}>
                                                        <a href="mailto:pharthai@pharmacycouncil.org" style={{ color: '#fff' }}>
                                                            pharthai@pharmacycouncil.org
                                                        </a>
                                                    </div>
                                                </div>

                                                {/* Social */}
                                                <div style={{ marginTop: '10px' }}>
                                                    <span style={{ fontSize: '14px', color: '#fff', marginRight: '12px' }}>ติดตามเรา:</span>
                                                    <div className="social-icon" style={{ display: 'inline-flex' }}>
                                                        <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                                                        <a href="#" title="TikTok"><i className="fab fa-tiktok"></i></a>
                                                        <a href="#" title="Line"><i className="fab fa-line"></i></a>
                                                        <a href="#" title="YouTube"><i className="fab fa-youtube"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom style-2">
                        <p>สงวนลิขสิทธิ์ © <Link href="/">Pharmacy Academy</Link></p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterTwo;