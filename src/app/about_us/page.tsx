
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import AboutUs from '@/components/about-us';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "เกี่ยวกับเรา - Pharmacy Academy",
    description: "รู้จัก Pharmacy Academy ศูนย์กลางการเรียนรู้ด้านเภสัชศาสตร์ออนไลน์",
    keywords: "เกี่ยวกับเรา, Pharmacy Academy, เภสัชศาสตร์, เภสัชกร",
};

const AboutUsPage = () => {
    return (
        <Wrapper>
            <AboutUs />
        </Wrapper>
    );
};

export default AboutUsPage;