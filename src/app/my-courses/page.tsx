import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import MyCoursesArea from '@/components/learning/MyCoursesArea';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "คอร์สของฉัน - Pharmacy Academy",
    description: "ดูคอร์สที่คุณลงทะเบียนและติดตามความคืบหน้า",
};

const MyCoursesPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <MyCoursesArea />
            <FooterTwo />
        </>
    );
};

export default MyCoursesPage;
