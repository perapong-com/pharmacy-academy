/**
 * CourseCard Component
 * Displays a course card with hover state
 * Extracted from CoursesGridArea.tsx for SOLID SRP compliance
 */

import Link from 'next/link';
import React from 'react';
import EnrollButton from '@/components/common/EnrollButton';
import { useLanguage } from '@/features/i18n';
import type { Course } from '../data/mockData';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { t } = useLanguage();

    return (
        <div className="courses-card-main-items" style={{ maxHeight: '380px' }}>
            {/* Default card state */}
            <div className="courses-card-items" style={{ marginTop: '15px' }}>
                <div className="courses-image">
                    <img
                        src={course.image}
                        alt={course.title}
                        style={{ maxHeight: '140px', objectFit: 'cover' }}
                    />
                    <h3 className="courses-title">{course.categoryEn}</h3>
                    <h4 className="topic-title">{course.cpe} CPE</h4>
                    <div className="arrow-items">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div
                                key={num}
                                className={`GlidingArrow${num > 1 ? ` delay${num - 1}` : ''}`}
                            >
                                <img src={`assets/img/courses/a${num}.png`} alt="img" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="courses-content">
                    <ul className="post-cat">
                        <li>
                            <Link href="/courses-grid">{course.category}</Link>
                        </li>
                        <li>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className="fas fa-star" />
                            ))}
                        </li>
                    </ul>
                    <h5>
                        <Link href="/courses-details">{course.title}</Link>
                    </h5>
                    <div className="client-items">
                        <div
                            className="client-img bg-cover"
                            style={{ background: `url(/assets/img/courses/client-1.png)` }}
                        />
                        <p>{course.instructor}</p>
                    </div>
                    <ul className="post-class">
                        <li>
                            <i className="far fa-clock" />
                            {course.duration}
                        </li>
                        <li>
                            <i className="far fa-user" />
                            {course.students} {t('คน', 'students')}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Hover state card */}
            <div
                className="courses-card-items-hover"
                style={{
                    marginTop: 20,
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="courses-content" style={{ width: '100%' }}>
                    <ul className="post-cat">
                        <li>
                            <Link href="/courses-grid">{course.category}</Link>
                        </li>
                        <li>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className="fas fa-star" />
                            ))}
                        </li>
                    </ul>
                    <h5>
                        <span style={{ fontSize: '20px', fontWeight: 700 }}>
                            {course.title}
                        </span>
                    </h5>
                    <h4>฿{course.price.toLocaleString()}</h4>
                    <span>{course.description}</span>
                    <div className="client-items">
                        <div
                            className="client-img bg-cover"
                            style={{ background: `url(/assets/img/courses/client-1.png)` }}
                        />
                        <p>{course.instructor}</p>
                    </div>
                    <ul className="post-class">
                        <li>
                            <i className="far fa-clock" />
                            {course.duration}
                        </li>
                        <li>
                            <i className="far fa-user" />
                            {course.students} {t('คน', 'students')}
                        </li>
                    </ul>
                    <EnrollButton courseId={course.id} className="theme-btn yellow-btn">
                        {t('สมัครเรียน', 'Enroll Now')}
                    </EnrollButton>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
