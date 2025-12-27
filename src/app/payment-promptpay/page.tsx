import React from 'react';
import { Metadata } from 'next';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { PaymentPromptPayArea } from '@/features/payment';

export const metadata: Metadata = {
    title: "ชำระเงินผ่าน PromptPay - Pharmacy Academy",
    description: "สแกน QR Code เพื่อชำระเงินผ่าน PromptPay",
};

const PaymentPromptPayPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentPromptPayArea />
            <FooterTwo />
        </>
    );
};

export default PaymentPromptPayPage;
