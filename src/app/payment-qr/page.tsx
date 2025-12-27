import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { PaymentQRArea } from '@/features/payment';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ชำระเงินด้วย QR Code - Pharmacy Academy",
    description: "ชำระเงินผ่าน PromptPay QR Code",
};

const PaymentQRPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentQRArea />
            <FooterTwo />
        </>
    );
};

export default PaymentQRPage;
