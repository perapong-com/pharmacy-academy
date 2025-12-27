import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/layouts/Wrapper';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { UserProfileArea } from '@/features/profile';

export const metadata: Metadata = {
    title: "โปรไฟล์ของฉัน - Pharmacy Academy",
    description: "ดูข้อมูลโปรไฟล์ คอร์สเรียน และใบ Certificate ของคุณ",
    keywords: "โปรไฟล์, ผู้ใช้, Pharmacy Academy, เภสัชกร, คอร์สเรียน",
};

const ProfilePage = () => {
    return (
        <Wrapper>
            <MarqueeOne />
            <HeaderTwo />
            <UserProfileArea />
            <FooterTwo />
        </Wrapper>
    );
};

export default ProfilePage;
