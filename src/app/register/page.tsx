import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import RegisterArea from '@/components/auth/RegisterArea';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "สมัครสมาชิก - Pharmacy Academy",
    description: "สมัครสมาชิกเพื่อเริ่มเรียนรู้",
};

const RegisterPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <RegisterArea />
            <FooterTwo />
        </>
    );
};

export default RegisterPage;
