import BreadcrumbCoursesDetails from '@/common/breadcrumb/BreadcrumbCoursesDetails';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import React from 'react';
import CoursesDetailsArea from './CoursesDetailsArea';
import RelatedCourses from './RelatedCourses';

const CoursesDetails = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <BreadcrumbCoursesDetails />
      <CoursesDetailsArea />
      <RelatedCourses />
      <MarqueeOne style_2={true} />
      <FooterTwo />
    </>
  );
};

export default CoursesDetails;