import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/components/layout/Wrapper';
import MarqueeOne from '@/components/common/MarqueeOne';
import FooterTwo from '@/components/layout/footers/FooterTwo';
import HeaderTwo from '@/components/layout/headers/HeaderTwo';
import BreadcrumbCourses from '@/components/common/breadcrumb/BreadcrumbCourses';
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
