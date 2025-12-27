import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { SignInArea } from '@/features/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "เข้าสู่ระบบ - Pharmacy Academy",
    description: "เข้าสู่ระบบเพื่อเรียนรู้และสะสม CPE",
};

const SignInPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <SignInArea />
            <FooterTwo />
        </>
    );
};

export default SignInPage;
