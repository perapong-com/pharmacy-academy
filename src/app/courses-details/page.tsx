import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/components/layout/Wrapper';
import MarqueeOne from '@/components/common/MarqueeOne';
import FooterTwo from '@/components/layout/footers/FooterTwo';
import HeaderTwo from '@/components/layout/headers/HeaderTwo';
import BreadcrumbCoursesDetails from '@/components/common/breadcrumb/BreadcrumbCoursesDetails';
import { CoursesDetailsArea, RelatedCourses } from '@/features/courses';

export const metadata: Metadata = {
    title: "รายละเอียดคอร์ส - Pharmacy Academy",
    description: "รายละเอียดคอร์สเรียน",
    keywords: "Online Course, Education, Pharmacy",
};

const CoursesDetailsPage = () => {
    return (
        <Wrapper>
            <MarqueeOne />
            <HeaderTwo />
            <BreadcrumbCoursesDetails />
            <CoursesDetailsArea />
            <RelatedCourses />
            <MarqueeOne style_2={true} />
            <FooterTwo />
        </Wrapper>
    );
};

export default CoursesDetailsPage;
