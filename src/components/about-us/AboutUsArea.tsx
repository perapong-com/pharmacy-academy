
import React from 'react';

const AboutUsArea = () => {
  return (
    <section className="about-section py-5">
      <div className="container">
        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <div className="about-content">
              <h2 style={{ color: '#004736', marginBottom: '20px' }}>
                <i className="fas fa-graduation-cap me-2"></i>
                พันธกิจของเรา
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                Pharmacy Academy มุ่งมั่นที่จะเป็นศูนย์กลางการเรียนรู้ด้านเภสัชศาสตร์ที่ครบวงจร 
                เราเชื่อว่าการศึกษาต่อเนื่องเป็นสิ่งสำคัญสำหรับเภสัชกรทุกคน เพื่อให้สามารถให้บริการ
                ด้านสุขภาพที่มีคุณภาพแก่ประชาชน
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                คอร์สเรียนของเราถูกออกแบบโดยผู้เชี่ยวชาญในแต่ละสาขา เพื่อให้ความรู้ที่ทันสมัย
                และสามารถนำไปประยุกต์ใช้ในการทำงานจริงได้
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image text-center">
              <img 
                src="assets/img/about/about-1.png" 
                alt="About Pharmacy Academy"
                style={{ maxWidth: '100%', borderRadius: '15px' }}
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="row align-items-center mb-5" style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '15px' }}>
          <div className="col-lg-6 order-lg-2">
            <div className="about-content">
              <h2 style={{ color: '#004736', marginBottom: '20px' }}>
                <i className="fas fa-eye me-2"></i>
                วิสัยทัศน์
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                เราตั้งเป้าหมายที่จะเป็นแพลตฟอร์มการเรียนรู้ออนไลน์ด้านเภสัชศาสตร์อันดับหนึ่ง
                ของประเทศไทย โดยมุ่งเน้นการพัฒนาศักยภาพของเภสัชกรในทุกสาขา
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '10px 0', fontSize: '16px', color: '#555' }}>
                  <i className="fas fa-check-circle me-2" style={{ color: '#004736' }}></i>
                  คอร์สเรียนคุณภาพสูงจากผู้เชี่ยวชาญ
                </li>
                <li style={{ padding: '10px 0', fontSize: '16px', color: '#555' }}>
                  <i className="fas fa-check-circle me-2" style={{ color: '#004736' }}></i>
                  เนื้อหาอัพเดทตามหลักวิชาการล่าสุด
                </li>
                <li style={{ padding: '10px 0', fontSize: '16px', color: '#555' }}>
                  <i className="fas fa-check-circle me-2" style={{ color: '#004736' }}></i>
                  รองรับ CPE สำหรับเภสัชกร
                </li>
                <li style={{ padding: '10px 0', fontSize: '16px', color: '#555' }}>
                  <i className="fas fa-check-circle me-2" style={{ color: '#004736' }}></i>
                  เรียนได้ทุกที่ ทุกเวลา
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="about-image text-center">
              <img 
                src="assets/img/about/about-2.png" 
                alt="Our Vision"
                style={{ maxWidth: '100%', borderRadius: '15px' }}
              />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="row">
          <div className="col-12">
            <div style={{ 
              background: 'linear-gradient(135deg, #004736 0%, #00875a 100%)', 
              padding: '50px', 
              borderRadius: '20px', 
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ marginBottom: '20px' }}>พร้อมที่จะเริ่มต้นเรียนรู้หรือยัง?</h2>
              <p style={{ marginBottom: '30px', fontSize: '18px' }}>
                เข้าร่วมกับเภสัชกรกว่า 1,000 คนที่เลือกเรียนกับเรา
              </p>
              <a 
                href="/courses-grid" 
                style={{ 
                  display: 'inline-block',
                  padding: '15px 40px', 
                  backgroundColor: 'white', 
                  color: '#004736', 
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
              >
                <i className="fas fa-book-open me-2"></i>
                ดูคอร์สเรียนทั้งหมด
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsArea;
