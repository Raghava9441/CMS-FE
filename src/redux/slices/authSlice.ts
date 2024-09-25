import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface based on the API response
interface User {
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

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: '',
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUserStart(state) {
            state.loading = true;
        },
        loginUserSuccess(state, action: PayloadAction<{ loggedInUser: User; accessToken: string; refreshToken: string }>) {
            console.log(action.payload.data)
            const { loggedInUser, accessToken, refreshToken } = action.payload.data;
            console.log(loggedInUser)
            state.loading = false;
            state.isAuthenticated = true;
            state.user = loggedInUser;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            // Save tokens and user data in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        loginUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
        },
        logoutUserStart(state) {
            state.loading = true;
        },
        logoutUserSuccess(state) {
            state.loading = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Remove tokens and user data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        logoutUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure, logoutUserStart, logoutUserSuccess, logoutUserFailure } = authSlice.actions;

export default authSlice.reducer;
