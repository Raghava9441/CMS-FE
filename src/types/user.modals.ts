export interface User {
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage?: string;
    age?: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    gender: 'male' | 'female' | 'other';
    organizationId: string;
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    status?: 'active' | 'inactive';
    dateOfBirth?: any;
    biography?: string;
    permissions?: string[];
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
    preferences?: {
        notifications?: boolean;
        language?: string;
    };
    password?: string;
    accessToken: string;
    refreshToken: string;
}