// Auth Service - API calls for authentication
import type {
    LoginCredentials,
    RegisterData,
    RegisterPharmacistData,
    AuthResponse,
    User,
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Mock users for development - ย้ายมาจาก AuthContext เดิม
const MOCK_USERS = [
    {
        email: 'andrew.johnson@gmail.com',
        password: '123456',
        name: 'Andrew Johnson',
        role: 'pharmacist' as const,
        avatar: undefined,
    },
    {
        email: 'user@ontrack.com',
        password: 'password123',
        name: 'Khun Somchai',
        role: 'general' as const,
        avatar: undefined,
    },
    {
        email: 'pharm@ontrack.com',
        password: 'password123',
        name: 'Phar. Somsri',
        role: 'pharmacist' as const,
        avatar: undefined,
    },
];

/**
 * Auth API Service
 * จัดการ API calls ทั้งหมดที่เกี่ยวกับ Authentication
 */
export const authService = {
    /**
     * Login
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        // const response = await fetch(`${API_BASE_URL}/auth/login`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(credentials),
        // });
        // return response.json();

        // Mock implementation
        await new Promise((resolve) => setTimeout(resolve, 800));

        const matchedUser = MOCK_USERS.find(
            (u) =>
                u.email.toLowerCase() === credentials.email.toLowerCase() &&
                u.password === credentials.password
        );

        if (matchedUser) {
            const user: User = {
                name: matchedUser.name,
                email: matchedUser.email,
                role: matchedUser.role,
                avatar: matchedUser.avatar,
            };
            return { success: true, user };
        }

        return { success: false, error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
    },

    /**
     * Register (บุคคลทั่วไป)
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock: Check if email already exists
        const emailExists = MOCK_USERS.some(
            (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );

        if (emailExists) {
            return { success: false, error: 'อีเมลนี้ถูกใช้งานแล้ว' };
        }

        const user: User = {
            name: data.name,
            email: data.email,
            role: 'general',
        };

        return { success: true, user };
    },

    /**
     * Register (เภสัชกร)
     */
    async registerPharmacist(data: RegisterPharmacistData): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const emailExists = MOCK_USERS.some(
            (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );

        if (emailExists) {
            return { success: false, error: 'อีเมลนี้ถูกใช้งานแล้ว' };
        }

        const user: User = {
            name: data.name,
            email: data.email,
            role: 'pharmacist',
            pharmacistLicense: data.pharmacistLicense,
            pharmacistVerificationStatus: 'pending',
        };

        return { success: true, user };
    },

    /**
     * Logout
     */
    async logout(): Promise<void> {
        // TODO: Replace with actual API call to invalidate token
        localStorage.removeItem('ontrack_user');
        localStorage.removeItem('token');
    },

    /**
     * Get current user from token
     */
    async getCurrentUser(): Promise<User | null> {
        // Try to get from localStorage first
        const storedUser = localStorage.getItem('ontrack_user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch {
                localStorage.removeItem('ontrack_user');
                return null;
            }
        }

        // TODO: Validate token with API
        // const token = localStorage.getItem('token');
        // if (token) {
        //   const response = await fetch(`${API_BASE_URL}/auth/me`, {
        //     headers: { 'Authorization': `Bearer ${token}` },
        //   });
        //   if (response.ok) return response.json();
        // }

        return null;
    },

    /**
     * Update profile
     */
    async updateProfile(data: Partial<User>): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            return { success: false, error: 'กรุณาเข้าสู่ระบบ' };
        }

        const updatedUser = { ...currentUser, ...data };
        localStorage.setItem('ontrack_user', JSON.stringify(updatedUser));

        return { success: true, user: updatedUser };
    },

    /**
     * Change password
     */
    async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock: Always succeed for now
        return { success: true };
    },

    /**
     * Forgot password - Send reset email
     */
    async forgotPassword(email: string): Promise<{ success: boolean; message?: string }> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
            success: true,
            message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว'
        };
    },

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        return { success: true };
    },

    /**
     * Persist user to localStorage
     */
    persistUser(user: User): void {
        localStorage.setItem('ontrack_user', JSON.stringify(user));
    },
};

export default authService;
