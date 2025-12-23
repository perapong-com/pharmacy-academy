import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import PaymentHistoryArea from '@/components/payment/PaymentHistoryArea';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ประวัติการชำระเงิน - Pharmacy Academy",
    description: "ดูประวัติการชำระเงินทั้งหมด",
};

const PaymentHistoryPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentHistoryArea />
            <FooterTwo />
        </>
    );
};

export default PaymentHistoryPage;
