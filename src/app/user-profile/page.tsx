
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import UserProfile from '@/components/user-profile';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "โปรไฟล์ของฉัน - Pharmacy Academy",
    description: "ดูข้อมูลโปรไฟล์ คอร์สเรียน และใบ Certificate ของคุณ",
    keywords: "โปรไฟล์, ผู้ใช้, Pharmacy Academy, เภสัชกร, คอร์สเรียน",
};

const UserProfilePage = () => {
    return (
        <Wrapper>
            <UserProfile />
        </Wrapper>
    );
};

export default UserProfilePage;
