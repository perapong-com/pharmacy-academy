"use client"
import menu_data from '@/data/menu_data';
import Link from 'next/link';
import React, { useState } from 'react';

const NavMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <>
      {menu_data.map((item, i) => (
        <li 
          key={i}
          style={{
            position: 'relative',
            listStyle: 'none',
          }}
          onMouseEnter={() => item.has_dropdown && setActiveDropdown(i)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link 
            href={item.link}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              color: '#333',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '13px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              background: activeDropdown === i ? '#f0fdf4' : 'transparent',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#004736';
              e.currentTarget.style.background = '#f0fdf4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeDropdown === i ? '#004736' : '#333';
              e.currentTarget.style.background = activeDropdown === i ? '#f0fdf4' : 'transparent';
            }}
          >
            <i className={item.icon} style={{ fontSize: '14px', color: '#004736' }}></i>
            <span>{item.title}</span>
            {item.has_dropdown && (
              <i 
                className="fas fa-chevron-down" 
                style={{ 
                  fontSize: '10px',
                  marginLeft: '4px',
                  transition: 'transform 0.2s',
                  transform: activeDropdown === i ? 'rotate(180deg)' : 'rotate(0)',
                }}
              ></i>
            )}
          </Link>

          {/* Dropdown Menu */}
          {item.has_dropdown && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                minWidth: '200px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                padding: '8px',
                opacity: activeDropdown === i ? 1 : 0,
                visibility: activeDropdown === i ? 'visible' : 'hidden',
                transform: activeDropdown === i ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'all 0.2s ease',
                zIndex: 100,
              }}
            >
              {item.sub_menus?.map((sub_item, sub_index) => (
                sub_item?.link && (
                  <Link 
                    key={sub_index}
                    href={sub_item.link}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      color: '#333',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0fdf4';
                      e.currentTarget.style.color = '#004736';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#333';
                    }}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: '10px', color: '#004736' }}></i>
                    {sub_item.title}
                  </Link>
                )
              ))}
            </div>
          )}
        </li>
      ))} 
    </>
  );
};

export default NavMenu;