"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
interface User {
    name: string;
    email: string;
    role: "general" | "pharmacist";
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

// Mock credentials - add your test accounts here
const MOCK_USERS = [
    {
        email: "andrew.johnson@gmail.com",
        password: "123456",
        name: "Andrew Johnson",
        role: "pharmacist" as const,
        avatar: null,
    },
    {
        email: "user@ontrack.com",
        password: "password123",
        name: "Khun Somchai",
        role: "general" as const,
        avatar: null,
    },
    {
        email: "pharm@ontrack.com",
        password: "password123",
        name: "Phar. Somsri",
        role: "pharmacist" as const,
        avatar: null,
    },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("ontrack_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("ontrack_user");
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Find matching user
        const matchedUser = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (matchedUser) {
            const userData: User = {
                name: matchedUser.name,
                email: matchedUser.email,
                role: matchedUser.role,
                avatar: matchedUser.avatar || undefined,
            };
            setUser(userData);
            localStorage.setItem("ontrack_user", JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("ontrack_user");
        window.location.href = "/sign-in";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
