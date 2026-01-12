"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/features/i18n';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <button
            onClick={toggleLanguage}
            className="language-switcher"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '2px' : '6px',
                padding: isMobile ? '3px 6px' : '8px 14px',
                background: 'transparent',
                border: isMobile ? '1.5px solid #014D40' : '2px solid #014D40',
                borderRadius: isMobile ? '6px' : '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: isMobile ? '10px' : '14px',
                fontWeight: '600',
                color: '#014D40',
                flexShrink: 0,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#014D40';
                e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#014D40';
            }}
            title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        >
            <span style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <span style={{
                    fontWeight: language === 'th' ? '700' : '400',
                    opacity: language === 'th' ? 1 : 0.6
                }}>TH</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span style={{
                    fontWeight: language === 'en' ? '700' : '400',
                    opacity: language === 'en' ? 1 : 0.6
                }}>EN</span>
            </span>
        </button>
    );
};

export default LanguageSwitcher;
