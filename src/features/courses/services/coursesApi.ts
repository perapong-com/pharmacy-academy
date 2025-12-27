// Courses API Service
import type {
    Course,
    CourseCard,
    CourseFilters,
    CoursesListResponse,
    CourseProgress,
    EnrolledCourse
} from '../types';

// API Base URL - ควรย้ายไป config
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Courses API Service
 * จัดการ API calls ทั้งหมดที่เกี่ยวกับ Courses
 */
export const coursesService = {
    /**
     * ดึงรายการคอร์สทั้งหมด
     */
    async getCourses(params: CourseFilters & { page?: number; limit?: number }): Promise<CoursesListResponse> {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.set('search', params.search);
        if (params.category) queryParams.set('category', params.category);
        if (params.difficulty) queryParams.set('difficulty', params.difficulty);
        if (params.hasCPE !== undefined) queryParams.set('hasCPE', String(params.hasCPE));
        if (params.sortBy) queryParams.set('sortBy', params.sortBy);
        if (params.page) queryParams.set('page', String(params.page));
        if (params.limit) queryParams.set('limit', String(params.limit));
        if (params.priceRange) {
            queryParams.set('minPrice', String(params.priceRange.min));
            queryParams.set('maxPrice', String(params.priceRange.max));
        }

        const response = await fetch(`${API_BASE_URL}/courses?${queryParams}`);

        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        return response.json();
    },

    /**
     * ดึงข้อมูลคอร์สตาม ID
     */
    async getCourseById(id: number | string): Promise<Course> {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('ไม่พบคอร์สที่ต้องการ');
            }
            throw new Error('Failed to fetch course');
        }

        return response.json();
    },

    /**
     * ดึงข้อมูลคอร์สตาม Slug
     */
    async getCourseBySlug(slug: string): Promise<Course> {
        const response = await fetch(`${API_BASE_URL}/courses/slug/${slug}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('ไม่พบคอร์สที่ต้องการ');
            }
            throw new Error('Failed to fetch course');
        }

        return response.json();
    },

    /**
     * ดึงคอร์สที่ลงทะเบียนแล้ว (ต้อง login)
     */
    async getEnrolledCourses(): Promise<EnrolledCourse[]> {
        const response = await fetch(`${API_BASE_URL}/courses/enrolled`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch enrolled courses');
        }

        return response.json();
    },

    /**
     * ลงทะเบียนคอร์ส
     */
    async enrollCourse(courseId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to enroll course');
        }
    },

    /**
     * ดึงความคืบหน้าการเรียน
     */
    async getCourseProgress(courseId: number): Promise<CourseProgress> {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/progress`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch progress');
        }

        return response.json();
    },

    /**
     * อัพเดทความคืบหน้า - Mark lesson as complete
     */
    async markLessonComplete(courseId: number, lessonId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons/${lessonId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to mark lesson as complete');
        }
    },

    /**
     * ดึง Related Courses
     */
    async getRelatedCourses(courseId: number, limit = 4): Promise<CourseCard[]> {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/related?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch related courses');
        }

        return response.json();
    },

    /**
     * ดึง Featured Courses
     */
    async getFeaturedCourses(limit = 6): Promise<CourseCard[]> {
        const response = await fetch(`${API_BASE_URL}/courses/featured?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch featured courses');
        }

        return response.json();
    },

    /**
     * ดึง Popular Courses
     */
    async getPopularCourses(limit = 8): Promise<CourseCard[]> {
        const response = await fetch(`${API_BASE_URL}/courses/popular?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch popular courses');
        }

        return response.json();
    },
};

export default coursesService;
