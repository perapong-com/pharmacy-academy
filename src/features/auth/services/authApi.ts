// Auth Service - API calls for authentication
import type {
    LoginCredentials,
    RegisterData,
    RegisterPharmacistData,
    AuthResponse,
    User,
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * Auth API Service
 * จัดการ API calls ทั้งหมดที่เกี่ยวกับ Authentication
 */
export const authService = {
    /**
     * Login
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || 'Login failed' };
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('ontrack_user', JSON.stringify(data.user));
            }

            return { success: true, user: data.user, token: data.token };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    },

    /**
     * Register (บุคคลทั่วไป)
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: data.name,
                    email: data.email,
                    password: data.password,
                    role: 'member',
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: result.message || 'Registration failed' };
            }

            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('ontrack_user', JSON.stringify(result.user));
            }

            return { success: true, user: result.user, token: result.token };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    },

    /**
     * Register (เภสัชกร)
     */
    async registerPharmacist(data: RegisterPharmacistData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: data.name,
                    email: data.email,
                    password: data.password,
                    role: 'pharmacist',
                    professionalLicenseNumber: data.professionalLicenseNumber,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: result.message || 'Registration failed' };
            }

            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('ontrack_user', JSON.stringify(result.user));
            }

            return { success: true, user: result.user, token: result.token };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    },

    /**
     * Logout
     */
    async logout(): Promise<void> {
        localStorage.removeItem('ontrack_user');
        localStorage.removeItem('token');
    },

    /**
     * Get current user from token
     */
    async getCurrentUser(): Promise<User | null> {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    localStorage.setItem('ontrack_user', JSON.stringify(data.user));
                    return data.user;
                }
            } else {
                // Token invalid or expired
                localStorage.removeItem('token');
                localStorage.removeItem('ontrack_user');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        return null;
    },

    /**
     * Update profile
     */
    async updateProfile(data: Partial<User>): Promise<AuthResponse> {
        throw new Error('Not implemented');
    },

    /**
     * Change password
     */
    async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
        throw new Error('Not implemented');
    },

    /**
     * Forgot password - Send reset email
     */
    async forgotPassword(email: string): Promise<{ success: boolean; message?: string }> {
        throw new Error('Not implemented');
    },

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
        throw new Error('Not implemented');
    },

    /**
     * Persist user to localStorage
     */
    persistUser(user: User): void {
        localStorage.setItem('ontrack_user', JSON.stringify(user));
    },
};

export default authService;
