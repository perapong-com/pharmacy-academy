
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import PaymentSuccessArea from './PaymentSuccessArea';
import MarqueeOne from '@/common/MarqueeOne';

const PaymentSuccess = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <PaymentSuccessArea />
      <FooterTwo />
    </>
  );
};

export default PaymentSuccess;
