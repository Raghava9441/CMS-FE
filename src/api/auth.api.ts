import { ApiResponse, ApiResponseError } from "@types/organization.modal";
import { axiosInstance } from "../utils/axiosInstance";

export interface User {
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage?: string;
    age?: string;
    roles: ('ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT')[];
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


async function registerUser(user: { email: string, password: string }): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<User>>('user/auth/register', user);
        return response.data;
    } catch (error) {
        throw error as ApiResponseError;
    }
}

async function loginUser(credentials: { email: string, password: string }): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<User>>('user/auth/login', credentials);
        return response.data;
    } catch (error: unknown) {
        if (error.response) {
            throw error?.response?.data as ApiResponseError;
        } else {
            throw new Error(error, 'An unexpected error occurred');
        }
    }
}

async function refreshAccessToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string, newRefreshToken: string }> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<{ accessToken: string, newRefreshToken: string }>>('user/auth/refresh', { refreshToken });
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

async function logoutUser(): Promise<ApiResponse<any> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<any>>('user/auth/logout');
        return response.data;
    } catch (error) {

        return error as ApiResponseError;
    }
}


async function getallUsers(): Promise<ApiResponse<User[]> | ApiResponseError> {
    try {
        const response = await axiosInstance.get<ApiResponse<User[]>>('/user');
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

async function getUserById(id: string): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.get<ApiResponse<User>>(`/user/${id}`);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

async function createUser(user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<User>>('/user', user);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}


async function updateUser(user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.put<ApiResponse<User>>('/user', {
            ...user,
            password: undefined,
            accessToken: undefined,
            refreshToken: undefined
        });
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

async function deleteUser(id: string): Promise<ApiResponse<User> | ApiResponseError> {
    try {
        const response = await axiosInstance.delete<ApiResponse<User>>(`/user/${id}`);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

export const authservice = {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    getallUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}