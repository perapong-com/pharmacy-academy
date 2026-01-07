"use client";

import React from 'react';
import { useLanguage } from '@/features/i18n';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'transparent',
                border: '2px solid #014D40',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '600',
                color: '#014D40',
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
                gap: '4px'
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
