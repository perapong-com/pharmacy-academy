"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import NavMenu from './NavMenu';
import UseSticky from '@/hooks/UseSticky';
import OffCanvas from '@/common/OffCanvas';
import HeaderUserProfile from '@/components/common/HeaderUserProfile';
import { useSearch } from '@/context/SearchContext';
import { useCart } from '@/context/CartContext';

const HeaderTwo = () => {
    const { sticky } = UseSticky();
    const [openCanvas, setOpenCanvas] = useState(false);
    const router = useRouter();
    
    // Search context
    const { 
        searchQuery, 
        setSearchQuery, 
        suggestions, 
        showSuggestions, 
        setShowSuggestions 
    } = useSearch();

    // Cart context
    const { cartItems } = useCart();
    
    const searchRef = useRef<HTMLDivElement>(null);
    const [searchFocused, setSearchFocused] = useState(false);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
                setSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowSuggestions]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            router.push(`/courses-grid?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleSuggestionClick = (courseId: number) => {
        setShowSuggestions(false);
        router.push(`/courses-details?id=${courseId}`);
    };

    return (
        <>
            <header 
                id="header-sticky" 
                className={`header-unified ${sticky ? "sticky" : ""}`}
                style={{
                    background: sticky ? 'rgba(255,255,255,0.98)' : '#fff',
                    backdropFilter: sticky ? 'blur(10px)' : 'none',
                    boxShadow: sticky 
                        ? '0 4px 20px rgba(0,0,0,0.08)' 
                        : '0 2px 12px rgba(0,0,0,0.04)',
                    position: sticky ? 'fixed' : 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                }}
            >
                <div className="container-fluid" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 24px' }}>
                    <div 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            gap: '16px',
                        }}
                    >
                        {/* Logo */}
                        <Link 
                            href="/" 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                flexShrink: 0,
                            }}
                        >
                            <img 
                                src="/assets/img/pharmacycouncil.jpg" 
                                alt="Pharmacy Academy"
                                style={{
                                    height: '70px',
                                    width: 'auto',
                                    borderRadius: '4px',
                                }}
                            />
                            <span style={{ 
                                fontSize: '16px', 
                                fontWeight: '700', 
                                color: '#004736',
                                whiteSpace: 'nowrap',
                            }}>
                                Pharmacy Academy
                            </span>
                        </Link>

                        {/* Navigation Menu - Desktop */}
                        <nav 
                            className="d-none d-xl-block" 
                            style={{ flex: 1 }}
                        >
                            <div className="main-menu">
                                <ul style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none',
                                }}>
                                    <NavMenu />
                                </ul>
                            </div>
                        </nav>

                        {/* Search Box */}
                        <div 
                            ref={searchRef} 
                            style={{ 
                                position: 'relative',
                                flex: '0 0 280px',
                            }}
                            className="d-none d-lg-block"
                        >
                            <form onSubmit={handleSearch}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: searchFocused ? '#fff' : '#f5f7fa',
                                    border: searchFocused ? '2px solid #004736' : '2px solid transparent',
                                    borderRadius: '12px',
                                    padding: '8px 14px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: searchFocused ? '0 4px 16px rgba(0,71,54,0.12)' : 'none',
                                }}>
                                    <i 
                                        className="far fa-search" 
                                        style={{ 
                                            color: searchFocused ? '#004736' : '#999', 
                                            fontSize: '14px',
                                            marginRight: '10px',
                                        }}
                                    ></i>
                                    <input 
                                        type="text" 
                                        placeholder="ค้นหาคอร์สเรียน..." 
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => {
                                            setShowSuggestions(true);
                                            setSearchFocused(true);
                                        }}
                                        style={{ 
                                            flex: 1,
                                            border: 'none',
                                            background: 'transparent',
                                            outline: 'none',
                                            fontSize: '14px',
                                            color: '#333',
                                        }}
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setShowSuggestions(false);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px',
                                                color: '#999',
                                            }}
                                        >
                                            <i className="fas fa-times" style={{ fontSize: '12px' }}></i>
                                        </button>
                                    )}
                                </div>
                            </form>
                            
                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    left: 0,
                                    right: 0,
                                    background: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    zIndex: 1000,
                                    overflow: 'hidden',
                                    animation: 'fadeInDown 0.2s ease',
                                }}>
                                    <div style={{ 
                                        padding: '12px 16px', 
                                        borderBottom: '1px solid #f0f0f0', 
                                        fontSize: '12px', 
                                        color: '#666',
                                        background: '#fafafa',
                                    }}>
                                        <i className="fas fa-lightbulb me-2" style={{ color: '#f59e0b' }}></i>
                                        แนะนำสำหรับ &quot;{searchQuery}&quot;
                                    </div>
                                    {suggestions.map((course) => (
                                        <div
                                            key={course.id}
                                            onClick={() => handleSuggestionClick(course.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #f5f5f5',
                                                transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                                        >
                                            <img 
                                                src={course.image} 
                                                alt={course.title}
                                                style={{
                                                    width: '48px',
                                                    height: '36px',
                                                    objectFit: 'cover',
                                                    borderRadius: '6px',
                                                }}
                                            />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '500', 
                                                    color: '#333',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                    {course.title}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>
                                                    {course.instructor} • <span style={{ color: '#004736', fontWeight: '600' }}>฿{course.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <i className="fas fa-chevron-right" style={{ color: '#ccc', fontSize: '12px' }}></i>
                                        </div>
                                    ))}
                                    <Link
                                        href={`/courses-grid?search=${encodeURIComponent(searchQuery)}`}
                                        onClick={() => setShowSuggestions(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            padding: '14px 16px',
                                            color: '#004736',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            background: '#f0fdf4',
                                            transition: 'background 0.15s',
                                        }}
                                    >
                                        ดูคอร์สทั้งหมด
                                        <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Right Section: Cart + Auth */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            flexShrink: 0,
                        }}>
                            {/* Cart Icon */}
                            <Link 
                                href="/shop-cart"
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: '#f5f7fa',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#e8f5f0';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#f5f7fa';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fas fa-shopping-cart" style={{ 
                                    color: '#004736', 
                                    fontSize: '18px' 
                                }}></i>
                                {cartItems.length > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        minWidth: '20px',
                                        height: '20px',
                                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 6px',
                                        boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                                    }}>
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Auth Buttons / User Profile */}
                            <div className="d-none d-md-block">
                                <HeaderUserProfile />
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button 
                                className="d-xl-none"
                                onClick={() => setOpenCanvas(!openCanvas)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: '#004736',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <i className="fas fa-bars" style={{ 
                                    color: '#fff', 
                                    fontSize: '18px' 
                                }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer when sticky */}
            {sticky && <div style={{ height: '68px' }}></div>}

            <OffCanvas openCanvas={openCanvas} setOpenCanvas={setOpenCanvas} />
        </>
    );
};

export default HeaderTwo;