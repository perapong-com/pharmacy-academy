
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import BreadcrumbCourses from '@/common/breadcrumb/BreadcrumbCourses';
import CoursesGridArea from './CoursesGridArea';
import MarqueeOne from '@/common/MarqueeOne';

const CoursesGrid = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <BreadcrumbCourses title="คอร์สเรียนทั้งหมด" subtitle="คอร์สเรียน" />
      <CoursesGridArea />
      <FooterTwo />
    </>
  );
};

export default CoursesGrid;