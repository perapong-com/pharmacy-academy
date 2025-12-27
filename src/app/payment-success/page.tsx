import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { PaymentSuccessArea } from '@/features/payment';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ชำระเงินสำเร็จ - Pharmacy Academy",
    description: "การชำระเงินสำเร็จแล้ว",
};

const PaymentSuccessPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentSuccessArea />
            <FooterTwo />
        </>
    );
};

export default PaymentSuccessPage;
