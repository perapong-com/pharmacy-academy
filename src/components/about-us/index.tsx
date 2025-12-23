
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import BreadcrumbAbout from '@/common/breadcrumb/BreadcrumbAbout';
import AboutUsArea from './AboutUsArea';
import MarqueeOne from '@/common/MarqueeOne';

const AboutUs = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <BreadcrumbAbout />
      <AboutUsArea />
      <FooterTwo />
    </>
  );
};

export default AboutUs;
