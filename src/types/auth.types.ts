// src/types/auth.types.ts

export interface User {
    _id: string; 
    username: string;
    firstName: string,
    lastName: string,
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
    activityStatus: ""; 
    dateOfBirth?: Date;
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
}

export interface OnlineFriend {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    onlineStatus: string;
}
