import React from 'react';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import { PaymentCardArea } from '@/features/payment';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ชำระเงินด้วยบัตรเครดิต - Pharmacy Academy",
    description: "ชำระเงินผ่านบัตรเครดิต/เดบิต",
};

const PaymentCardPage = () => {
    return (
        <>
            <MarqueeOne />
            <HeaderTwo />
            <PaymentCardArea />
            <FooterTwo />
        </>
    );
};

export default PaymentCardPage;
