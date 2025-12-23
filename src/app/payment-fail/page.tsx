import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import PaymentFailArea from '@/components/payment/PaymentFailArea';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "การชำระเงินไม่สำเร็จ - Pharmacy Academy",
    description: "เกิดข้อผิดพลาดระหว่างการชำระเงิน",
};

const PaymentFailPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentFailArea />
            <FooterTwo />
        </>
    );
};

export default PaymentFailPage;
