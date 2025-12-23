
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import HomeTwo from '@/components/homes/home-2';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Eduspace - Online Course & Education Template",
    description: "Online Course, Education & University Next JS Template",
    keywords: "Online Course, Education, University, Next.js",
};

const Home = () => {
    return (
        <Wrapper>
            <HomeTwo />
        </Wrapper>
    );
};

export default Home;
