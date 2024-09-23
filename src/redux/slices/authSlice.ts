import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userActions } from '../actions/userActions';

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

// Define the initial state for the auth slice
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        username: '',
        email: '',
        fullname: '',
        avatar: '',
        coverImage: '',
        age: '',
        role: 'STUDENT',
        gender: 'male',
        organizationId: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        status: 'active' as 'active' | 'inactive' | undefined,
        dateOfBirth: new Date(),
        biography: '',
        permissions: [] as string[],
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: ''
        },
        preferences: {
            notifications: false,
            language: 'en'
        },
    },
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: '',
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(userActions.loginUser.fulfilled, (state, action) => {
    //             state.isAuthenticated = true;
    //             state.user = action.payload.data;
    //             state.accessToken = action.payload.data.accessToken;
    //             state.refreshToken = action.payload.data.refreshToken;
    //         })
    //         .addCase(userActions.loginUser.pending, (state, action) => {
    //             console.log('pending');
    //             state.loading = true;
    //         }).
    //         addCase(userActions.loginUser.rejected, (state, action) => {
    //             console.log('rejected');
    //             state.loading = false;
    //             state.error = action.error.message || 'An error occurred while logging in';
    //         });

    //     builder
    //         .addCase(userActions.logoutUser.fulfilled, (state, action) => {
    //             state.isAuthenticated = false;
    //             state.user = null;
    //             state.accessToken = null;
    //             state.refreshToken = null;
    //         }).addCase(userActions.logoutUser.pending, (state, action) => {
    //             console.log('pending');
    //             state.loading = true;
    //         })
    //         .addCase(userActions.logoutUser.rejected, (state, action) => {
    //             console.log('rejected');
    //             state.loading = false;
    //             state.error = action.error.message || 'An error occurred while logging out';
    //         });
    // },
});

// Export the actions and reducer
export default authSlice.reducer;
