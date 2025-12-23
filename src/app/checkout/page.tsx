import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import CheckoutArea from '@/components/payment/CheckoutArea';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ชำระเงิน - Pharmacy Academy",
    description: "ชำระเงินสำหรับคอร์สเรียน",
};

const CheckoutPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <CheckoutArea />
            <FooterTwo />
        </>
    );
};

export default CheckoutPage;
