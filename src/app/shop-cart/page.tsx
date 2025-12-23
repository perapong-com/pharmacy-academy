
import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import ShopCart from '@/components/shop-cart';



import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Shop Cart - Eduspace - Online Course, Education & University Next JS Template",
    description: "Shopping Cart",
    keywords: "Online Course, Education, University",
};


const index = () => {
    return (
        <Wrapper>
            <ShopCart />
        </Wrapper>
    );
};

export default index;
