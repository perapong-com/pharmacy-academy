
import CoursesGrid from '@/components/courses-grid';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';


import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Courses Grid - Eduspace - Online Course, Education & University Next JS Template",
    description: "Browse our courses",
    keywords: "Online Course, Education, University",
};


const index = () => {
    return (
        <Wrapper>
            <CoursesGrid />
        </Wrapper>
    );
};

export default index;
