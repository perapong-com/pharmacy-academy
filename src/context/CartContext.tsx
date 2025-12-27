"use client";
// This file re-exports from features for backward compatibility
// TODO: Update all imports to use @/features/cart directly

export { CartProvider, CartContext } from '@/features/cart/CartProvider';
export { useCart } from '@/features/cart/hooks';
export type { CartItem } from '@/features/cart/types';

// Legacy exports for backward compatibility
export type { CartContextType } from '@/features/cart/types';
