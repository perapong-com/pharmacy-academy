import BreadcrumbShop from '@/common/breadcrumb/BreadcrumbShop';
import MarqueeOne from '@/common/MarqueeOne';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import React from 'react';
import ShopCartArea from './ShopCartArea';

const ShopCart = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <BreadcrumbShop title="ตะกร้าสินค้า" subtitle="ตะกร้าสินค้า" />
      <ShopCartArea />
      <MarqueeOne style_2={true} />
      <FooterTwo />
    </>
  );
};

export default ShopCart;