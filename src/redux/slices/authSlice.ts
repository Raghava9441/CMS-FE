import { GetFriends, SearchFriends } from '@redux/actions/userActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface based on the API response
export interface User {
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
    activityStatus: "",
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
    error: string | boolean;
    snackbar: {
        open: boolean,
        message: string | null,
        severity: 'error' | 'success' | 'warning' | 'info',
    },
    friends: [],
    onlineFriends: { _id: string; email: string; avatar: string; activityStatus: string; onlineStatus: string }[],
    showFriendsMenu: boolean,
    searchResults: [] | null,
    searchCount: null | number | boolean,
    isLoading: boolean,
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: '',
    snackbar: {
        open: false,
        message: null,
        severity: null,
    },
    friends: [],
    onlineFriends: [],
    searchResults: [],
    showFriendsMenu: false,
    searchCount: null,
    isLoading: false
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
            // console.log(action.payload.data)
            const { loggedInUser, accessToken, refreshToken } = action.payload.data;
            // console.log(loggedInUser)
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
        openSnackbar(state, action) {
            // console.log("action", action)
            // console.log("action.payload.severity", action.payload.severity)
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open = false;
        },
        setShowFriendsMenu(state) {
            state.showFriendsMenu = !state.showFriendsMenu;
        },
        updateOnlineUsers: (state, action) => {
            const { _id, firstName, lastName, avatar, onlineStatus } = action.payload;
            const index = state.onlineFriends.findIndex(
                (friend) => friend._id === _id
            );

            if (index !== -1) {
                // If user is already in onlineFriends array, update onlineStatus
                state.onlineFriends[index].onlineStatus = onlineStatus;
            } else {
                // If user is not in onlineFriends array, add the whole object to the array
                state.onlineFriends.push({
                    _id,
                    firstName,
                    lastName,
                    avatar,
                    onlineStatus,
                });
            }
        },
        //cancel friend
        removeFriend: (state, action) => {
            const { friend_id } = action.payload;

            // Find index of friend to remove
            const index = state.friends.findIndex(
                (friend) => friend._id === friend_id
            );
            if (index !== -1) {
                // Remove friend from friends array
                state.friends.splice(index, 1);
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearSearch: (state, action) => {
            state.searchResults = [];
            state.searchCount = null;
        },
    },
    extraReducers(builder) {
        builder
            // --------- Search Friends Builder ---------
            .addCase(SearchFriends.pending, handlePending)
            .addCase(SearchFriends.fulfilled, (state, action) => {
                if (action.payload.usersFound === 0) {
                    state.searchResults = null;
                    state.searchCount = null;
                } else {
                    state.searchResults = action.payload.friends;
                    state.searchCount = action.payload.usersFound;
                }
                state.isLoading = false;
                state.error = false;
            })
            .addCase(SearchFriends.rejected, handleRejected)

            .addCase(GetFriends.pending, handlePending)
            .addCase(GetFriends.fulfilled, (state, action) => {
                // console.log(action.payload.data)
                state.friends = action.payload.data.friends;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(GetFriends.rejected, handleRejected)
    }
});

function handleRejected(state, action) {
    state.isLoading = false;
    state.error = true;
}

// function for pending and rejected handling
function handlePending(state, action) {
    state.isLoading = true;
    state.error = false;
}

export function ShowSnackbar({ message, severity }: { message: string, severity: 'error' | 'success' | 'warning' | 'info' }) {
    // console.log(" severity:", severity)
    // console.log(message)
    return async (dispatch, getState) => {
        dispatch(authSlice.actions.openSnackbar({ message, severity }));
    };
}

export function HideSnackbar() {
    return async (dispatch, getState) => {
        dispatch(authSlice.actions.closeSnackbar());
    };
}


export function ClearSearch() {
    return async (dispatch, getState) => {
        dispatch(authSlice.actions.clearSearch());
    };
}

export const { loginUserStart, loginUserSuccess, loginUserFailure, logoutUserStart, logoutUserSuccess, logoutUserFailure, setShowFriendsMenu, updateOnlineUsers, removeFriend } = authSlice.actions;

export default authSlice.reducer;
