
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import PaymentCardArea from './PaymentCardArea';
import MarqueeOne from '@/common/MarqueeOne';

const PaymentCard = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <PaymentCardArea />
      <FooterTwo />
    </>
  );
};

export default PaymentCard;
