import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/layouts/Wrapper';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import BreadcrumbCourses from '@/common/breadcrumb/BreadcrumbCourses';
import { CoursesGridArea } from '@/features/courses';

export const metadata: Metadata = {
    title: "คอร์สเรียน - Pharmacy Academy",
    description: "สำรวจคอร์สเรียนทั้งหมด",
    keywords: "Online Course, Education, Pharmacy",
};

const CoursesGridPage = () => {
    return (
        <Wrapper>
            <MarqueeOne />
            <HeaderTwo />
            <BreadcrumbCourses title="คอร์สเรียนทั้งหมด" subtitle="คอร์สเรียน" />
            <CoursesGridArea />
            <FooterTwo />
        </Wrapper>
    );
};

export default CoursesGridPage;
