// Cart Provider - Context Provider for Shopping Cart
'use client';

import React, { createContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import type { CartContextType, CartItem } from './types';

const CART_STORAGE_KEY = 'pharmacyCart';

// Create context with undefined default
export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

/**
 * CartProvider Component
 * Refactored จาก context/CartContext.tsx เดิม
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage when it changes (only after hydration)
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    // Add item to cart
    const addToCart = useCallback((item: CartItem) => {
        setItems((prev) => {
            // Check if item already exists
            if (prev.some((i) => i.id === item.id)) {
                return prev; // Don't add duplicates
            }
            return [...prev, item];
        });
    }, []);

    // Remove item from cart
    const removeFromCart = useCallback((id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    // Clear cart
    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    // Check if item is in cart
    const isInCart = useCallback(
        (id: number) => {
            return items.some((item) => item.id === id);
        },
        [items]
    );

    // Computed values
    const cartCount = items.length;

    const cartTotal = useMemo(
        () => items.reduce((sum, item) => sum + item.price, 0),
        [items]
    );

    const totalOriginalPrice = useMemo(
        () => items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0),
        [items]
    );

    const totalDiscount = useMemo(
        () => totalOriginalPrice - cartTotal,
        [totalOriginalPrice, cartTotal]
    );

    const value: CartContextType = {
        items,
        cartItems: items, // alias for backward compatibility
        isHydrated,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
        totalOriginalPrice,
        totalDiscount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
