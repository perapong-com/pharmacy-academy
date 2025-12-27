import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { RegisterPharmacistArea } from '@/features/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ลงทะเบียนเภสัชกร - Pharmacy Academy",
    description: "ลงทะเบียนเภสัชกรเพื่อสะสมหน่วยกิต CPE",
};

const RegisterPharmacistPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <RegisterPharmacistArea />
            <FooterTwo />
        </>
    );
};

export default RegisterPharmacistPage;
