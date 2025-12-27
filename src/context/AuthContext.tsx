"use client";
// This file re-exports from features for backward compatibility
// TODO: Update all imports to use @/features/auth directly

export { AuthProvider, AuthContext } from '@/features/auth/AuthProvider';
export { useAuth } from '@/features/auth/hooks';
export type { User, AuthContextType } from '@/features/auth/types';
