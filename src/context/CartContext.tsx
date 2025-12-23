"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Course item type
export interface CartItem {
    id: number;
    title: string;
    instructor: string;
    price: number;
    image: string;
    category?: string;
}

// Cart context type
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    isInCart: (id: number) => boolean;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('pharmacyCart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage when it changes (only after hydration)
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('pharmacyCart', JSON.stringify(cartItems));
        }
    }, [cartItems, isHydrated]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            // Check if item already exists
            if (prev.some(i => i.id === item.id)) {
                return prev; // Don't add duplicates
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (id: number) => {
        return cartItems.some(item => item.id === id);
    };

    const cartCount = cartItems.length;
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            isInCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
