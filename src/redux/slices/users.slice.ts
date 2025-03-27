import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    __v: number;
    _id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage?: string;
    age?: number;
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
    activityStatus: "",
    dateOfBirth?: string;
    biography?: string;
    permissions?: string[];
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
    preferences?: {
        notifications?: boolean;
        language?: string;
        theme?: string;
        timezone?: string;
        currency?: string;
        dateFormat?: string;
    };
    createdAt: string;
    updatedAt: string;
    password: string;
    refreshToken: string;
}

interface NewApiResponseData {
    users: User[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalUsers: number;
}

interface UsersState {
    data: NewApiResponseData | null;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    data: null,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchUserByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserByIdSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchUserByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        createUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        createUserSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        createUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess(state, action: PayloadAction<User>) {
            console.log(action.payload)
            state.loading = false;
            if (state.data) {
                state.data = {
                    ...state.data,
                    users: state.data.users.map(user => user._id === action.payload._id ? action.payload : user)
                };
            }
            state.error = null;
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, fetchUserByIdStart, fetchUserByIdSuccess, fetchUserByIdFailure, createUserStart, createUserSuccess, createUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = usersSlice.actions;

export default usersSlice.reducer;