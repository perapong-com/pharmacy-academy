
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import PaymentPromptPay from '@/components/payment/index-promptpay';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "ชำระเงินผ่าน PromptPay - Pharmacy Academy",
    description: "สแกน QR Code เพื่อชำระเงินผ่าน PromptPay",
};

const PaymentPromptPayPage = () => {
    return (
        <Wrapper>
            <PaymentPromptPay />
        </Wrapper>
    );
};

export default PaymentPromptPayPage;
