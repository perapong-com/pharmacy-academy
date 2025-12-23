
import React from 'react';
import FooterTwo from '@/layouts/footers/FooterTwo';
import HeaderTwo from '@/layouts/headers/Header';
import BreadcrumbProfile from '@/common/breadcrumb/BreadcrumbProfile';
import UserProfileArea from './UserProfileArea';
import MarqueeOne from '@/common/MarqueeOne';

const UserProfile = () => {
  return (
    <>
      <MarqueeOne />
      <HeaderTwo />
      <BreadcrumbProfile />
      <UserProfileArea />
      <FooterTwo />
    </>
  );
};

export default UserProfile;
