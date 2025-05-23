import { GetFriends, SearchFriends } from '../actions/userActions'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, OnlineFriend } from '../../types/auth.types'; // Step 2: Import User and OnlineFriend

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
        severity: 'error' | 'success' | 'warning' | 'info' | null, // Fix 6: Allow null
    },
    friends: User[], // Fix 4: Correct type for friends
    onlineFriends: OnlineFriend[], // Fix 3: Use defined OnlineFriend type
    showFriendsMenu: boolean,
    searchResults: User[] | null, // Fix 5: Correct type for searchResults
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
        severity: null, // Matches corrected AuthState
    },
    friends: [],
    onlineFriends: [],
    searchResults: [], // Initial value is empty array, compatible with User[] | null
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
            const { loggedInUser, accessToken, refreshToken } = action.payload; // Fix 2: Correct payload access
            state.loading = false;
            state.isAuthenticated = true;
            state.user = loggedInUser;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            // No need to set isAuthenticated again, it's already true

            // Save tokens and user data in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        loginUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null; // Clear user on failure
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
        openSnackbar(state, action: PayloadAction<{ message: string; severity: 'error' | 'success' | 'warning' | 'info' }>) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action: PayloadAction<undefined>) { // Payload is undefined
            state.snackbar.open = false;
            state.snackbar.message = null; // Optionally reset message and severity
            state.snackbar.severity = null;
        },
        setShowFriendsMenu(state) {
            state.showFriendsMenu = !state.showFriendsMenu;
        },
        updateOnlineUsers: (state, action: PayloadAction<OnlineFriend>) => { // Use OnlineFriend for payload
            const newOnlineFriend = action.payload;
            const index = state.onlineFriends.findIndex(
                (friend) => friend._id === newOnlineFriend._id
            );

            if (index !== -1) {
                // If user is already in onlineFriends array, update existing friend
                state.onlineFriends[index] = { ...state.onlineFriends[index], ...newOnlineFriend };
            } else {
                // If user is not in onlineFriends array, add the new object
                state.onlineFriends.push(newOnlineFriend);
            }
        },
        removeFriend: (state, action: PayloadAction<{ friend_id: string }>) => {
            const { friend_id } = action.payload;
            state.friends = state.friends.filter((friend) => friend._id !== friend_id);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearSearch: (state, action: PayloadAction<undefined>) => { // Payload is undefined
            state.searchResults = []; // Or null, depending on desired state
            state.searchCount = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(SearchFriends.pending, handlePending)
            .addCase(SearchFriends.fulfilled, (state, action) => {
                if (action.payload.usersFound === 0) {
                    state.searchResults = null; // Keep as null if no users found
                    state.searchCount = 0; // Set count to 0
                } else {
                    state.searchResults = action.payload.friends as User[]; // Assuming payload.friends are User[]
                    state.searchCount = action.payload.usersFound;
                }
                state.isLoading = false;
                state.error = false;
            })
            .addCase(SearchFriends.rejected, handleRejected)

            .addCase(GetFriends.pending, handlePending)
            .addCase(GetFriends.fulfilled, (state, action) => {
                state.friends = action.payload.data.friends as User[]; // Assuming payload.data.friends are User[]
                state.isLoading = false;
                state.error = false;
            })
            .addCase(GetFriends.rejected, handleRejected)
    }
});

function handleRejected(state: AuthState, action: any) { // Use AuthState for type safety
    state.isLoading = false;
    state.error = action.error?.message || true; // Store error message if available
}

function handlePending(state: AuthState, action: any) { // Use AuthState for type safety
    state.isLoading = true;
    state.error = false;
}

// Thunks (already defined, ensure dispatch calls are correct)
export function ShowSnackbar({ message, severity }: { message: string, severity: 'error' | 'success' | 'warning' | 'info' }) {
    return async (dispatch: any) => { // Use any for dispatch if thunk type is complex
        dispatch(authSlice.actions.openSnackbar({ message, severity }));
    };
}

export function HideSnackbar() {
    return async (dispatch: any) => {
        dispatch(authSlice.actions.closeSnackbar(undefined)); // Fix 7: Correct dispatch call
    };
}

export function ClearSearch() {
    return async (dispatch: any) => {
        dispatch(authSlice.actions.clearSearch(undefined)); // Fix 7: Correct dispatch call
    };
}

// Export all actions and the reducer
export const { 
    loginUserStart, 
    loginUserSuccess, 
    loginUserFailure, 
    logoutUserStart, 
    logoutUserSuccess, 
    logoutUserFailure, 
    openSnackbar, 
    closeSnackbar, 
    setShowFriendsMenu, 
    updateOnlineUsers, 
    removeFriend,
    setLoading,
    clearSearch 
} = authSlice.actions; // Fix 8: Ensure all actions are exported

export default authSlice.reducer;
