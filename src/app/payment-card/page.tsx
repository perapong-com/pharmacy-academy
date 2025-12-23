
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import PaymentCard from '@/components/payment/index-card';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "ชำระเงินผ่านบัตรเครดิต - Pharmacy Academy",
    description: "ชำระเงินผ่านบัตรเครดิต/เดบิต",
};

const PaymentCardPage = () => {
    return (
        <Wrapper>
            <PaymentCard />
        </Wrapper>
    );
};

export default PaymentCardPage;
