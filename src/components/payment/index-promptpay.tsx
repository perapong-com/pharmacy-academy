
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import PaymentPromptPayArea from './PaymentPromptPayArea';
import MarqueeOne from '@/common/MarqueeOne';

const PaymentPromptPay = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <PaymentPromptPayArea />
      <FooterTwo />
    </>
  );
};

export default PaymentPromptPay;
