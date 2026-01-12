"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useLanguage } from '@/features/i18n';
import { useAuth } from '@/features/auth';

interface MenuItem {
    label: string;
    href?: string;
    submenu?: { label: string; href: string }[];
}

const OffCanvas = ({ setOpenCanvas, openCanvas }: any) => {
    const { t } = useLanguage();
    const { user, isAuthenticated, logout } = useAuth();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const menuItems: MenuItem[] = [
        { label: t('หน้าแรก', 'Home'), href: '/' },
        { label: t('คอร์สเรียน', 'Courses'), href: '/courses-grid' },
        { label: t('เกี่ยวกับเรา', 'About Us'), href: '/about_us' },
    ];

    const handleLogout = () => {
        setOpenCanvas(false);
        logout();
    };

    return (
        <>
            {/* Full Screen Mobile Menu */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#fff',
                    zIndex: 9999,
                    display: openCanvas ? 'flex' : 'none',
                    flexDirection: 'column',
                    padding: '16px',
                    overflowY: 'auto',
                }}
            >
                {/* Header - Logo and Hamburger */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #eee',
                }}>
                    <Link href="/" onClick={() => setOpenCanvas(false)} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                    }}>
                        <img src="/images/Logo.jpg" alt="Pharmacy Academy" style={{ height: '45px', width: 'auto' }} />
                        <span style={{ fontWeight: 'bold', color: '#014D40', fontSize: '18px' }}>
                            Pharmacy Academy
                        </span>
                    </Link>

                    {/* X icon to close */}
                    <button
                        onClick={() => setOpenCanvas(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            fontSize: '24px',
                            color: '#333',
                        }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Menu Items */}
                <nav style={{ flex: 1, paddingTop: '16px' }}>
                    {menuItems.map((item, index) => (
                        <div key={index} style={{ marginBottom: '2px' }}>
                            {item.submenu ? (
                                // Menu with submenu
                                <>
                                    <button
                                        onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            background: 'none',
                                            border: 'none',
                                            padding: '14px 12px',
                                            minHeight: '48px',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            color: '#333',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        {item.label}
                                        <i
                                            className={`fas fa-chevron-down`}
                                            style={{
                                                fontSize: '12px',
                                                color: '#999',
                                                transition: 'transform 0.2s',
                                                transform: openSubmenu === item.label ? 'rotate(180deg)' : 'rotate(0)',
                                            }}
                                        ></i>
                                    </button>
                                    {openSubmenu === item.label && (
                                        <div style={{ paddingLeft: '20px', paddingTop: '10px' }}>
                                            {item.submenu.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={sub.href}
                                                    onClick={() => setOpenCanvas(false)}
                                                    style={{
                                                        display: 'block',
                                                        padding: '12px 0',
                                                        fontSize: '16px',
                                                        color: '#666',
                                                        textDecoration: 'none',
                                                        borderBottom: '1px solid #f5f5f5',
                                                    }}
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href || '/'}
                                    onClick={() => setOpenCanvas(false)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '14px 12px',
                                        minHeight: '48px',
                                        fontSize: '17px',
                                        fontWeight: '500',
                                        color: '#333',
                                        textDecoration: 'none',
                                        borderRadius: '8px',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Bottom Section - Profile and Logout */}
                <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '2px solid #eee',
                    background: '#f9fafb',
                    margin: '16px -16px -16px -16px',
                    padding: '16px',
                }}>
                    {isAuthenticated && user ? (
                        <>
                            {/* User Profile Dropdown */}
                            <button
                                onClick={() => setOpenSubmenu(openSubmenu === 'profile' ? null : 'profile')}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    background: 'none',
                                    border: 'none',
                                    padding: '0',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px 0',
                                    borderBottom: '1px solid #f5f5f5',
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: '#f0f0f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }}>
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <i className="fas fa-user" style={{ color: '#666', fontSize: '16px' }}></i>
                                        )}
                                    </div>
                                    <span style={{ flex: 1, fontSize: '19px', fontWeight: '700', color: '#014D40' }}>
                                        {user.name}
                                    </span>
                                    <i
                                        className="fas fa-chevron-down"
                                        style={{
                                            fontSize: '12px',
                                            color: '#999',
                                            transition: 'transform 0.2s',
                                            transform: openSubmenu === 'profile' ? 'rotate(180deg)' : 'rotate(0)',
                                        }}
                                    ></i>
                                </div>
                            </button>

                            {/* Profile Submenu */}
                            {openSubmenu === 'profile' && (
                                <div style={{ paddingLeft: '52px', paddingTop: '8px' }}>
                                    <Link
                                        href="/profile"
                                        onClick={() => setOpenCanvas(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            color: '#666',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid #f5f5f5',
                                        }}
                                    >
                                        <i className="fas fa-user-circle" style={{ color: '#014D40' }}></i>
                                        {t('โปรไฟล์', 'Profile')}
                                    </Link>
                                    <Link
                                        href="/payment-history"
                                        onClick={() => setOpenCanvas(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            color: '#666',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid #f5f5f5',
                                        }}
                                    >
                                        <i className="fas fa-receipt" style={{ color: '#d97706' }}></i>
                                        {t('ประวัติชำระเงิน', 'Payment History')}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            width: '100%',
                                            textAlign: 'left',
                                            background: 'none',
                                            border: 'none',
                                            padding: '12px 0',
                                            fontSize: '16px',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                        {t('ออกจากระบบ', 'Logout')}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Sign In */}
                            <Link
                                href="/sign-in"
                                onClick={() => setOpenCanvas(false)}
                                style={{
                                    display: 'block',
                                    padding: '16px 0',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#333',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid #f5f5f5',
                                }}
                            >
                                {t('เข้าสู่ระบบ', 'Sign In')}
                            </Link>

                            {/* Register */}
                            <Link
                                href="/register"
                                onClick={() => setOpenCanvas(false)}
                                style={{
                                    display: 'block',
                                    padding: '16px 0',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#014D40',
                                    textDecoration: 'none',
                                }}
                            >
                                {t('ลงทะเบียน', 'Register')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OffCanvas;