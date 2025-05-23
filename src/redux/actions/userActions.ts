//create user actions to dispatch
import { AppDispatch } from '../store';
import { createUserStart, createUserSuccess, deleteUserStart, deleteUserSuccess, fetchUserByIdStart, fetchUserByIdSuccess, fetchUsersStart, fetchUsersSuccess, updateUserStart, updateUserSuccess } from '../slices/users.slice';
import { toast } from 'react-toastify';
import { FriendRequest, userApi } from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openSnackbar } from '../slices/authSlice'; // Changed from ShowSnackbar to openSnackbar
import { User } from '../../types/auth.types'; 

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchUsersStart()); // Set loading state to true
        // const response = await authservice.getallUsers();
        const response = await userApi.getusers();
        // console.log(response.data.data)
        dispatch(fetchUsersSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error((error as Error)?.message || 'Failed to fetch users', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const fetchUserById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchUserByIdStart()); // Set loading state to true
        const response = await userApi.getUserById(id);
        console.log(response.data)
        dispatch(fetchUserByIdSuccess(response.data)); // Pass data to success action
    } catch (error) {
        toast.error((error as Error)?.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const createUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createUserStart());
        console.log(user) // Set loading state to true
        const response = await userApi.createUser(user);
        console.log(response)
        dispatch(createUserSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error: unknown) {
        toast.error((error as Error)?.message || 'Failed to fetch user', {
            autoClose: 3000,
        });
    }
};

export const updateUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateUserStart()); // Set loading state to true
        const response = await userApi.updateUser(user);
        console.log(response.data.data)
        dispatch(updateUserSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error((error as Error).message || 'Failed to fetch user', { // Fix 2: Safe error message access
        toast.error((error as Error).message || 'Failed to fetch user', { // Fix 2: Safe error message access
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteUserStart()); // Set loading state to true
        const response = await userApi.deleteUser(id);
        dispatch(deleteUserSuccess(response.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

// ------------- Get Friends Thunk -------------
export const GetFriends = createAsyncThunk(
    "friends/get-friends",
    async (arg, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await FriendRequest.getFriends();
            console.log(data)
            return data;
        } catch (error: any) { 
            // dispatch( 
            //   openSnackbar({ // Example if this block were active
            //     severity: 'error', 
            //     message: (error.response?.data?.message || (error as Error).message || 'An unknown error occurred') 
            //   })
            // );
            return rejectWithValue(error.response?.data || error.message || error); // More detailed error info
        }
    }
);

// ------------- Get Online Friends Thunk -------------
export const GetOnlineFriends = createAsyncThunk(
    "friends/online-friends",
    async (arg, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await FriendRequest.getOnlineFriends()

            return data;
        } catch (error: any) { 
            // dispatch( 
            //   openSnackbar({ // Example if this block were active
            //     severity: 'error', 
            //     message: (error.response?.data?.message || (error as Error).message || 'An unknown error occurred') 
            //   })
            // );
            return rejectWithValue(error.response?.data || error.message || error); // More detailed error info
        }
    }
);

export const SearchFriends = createAsyncThunk(
    "friends/search",
    async (searchData: { keyword: string; page?: number }, { rejectWithValue, dispatch }) => { // Fix 4: Typed searchData
        try {
            const { data } = await FriendRequest.searchFriends(`/friends/search/?search=${searchData.keyword}&page=${searchData.page || 0}`); 
            return data;
        } catch (error: any) { 
            dispatch( 
              openSnackbar({ // Changed to use openSnackbar directly
                severity: 'error', 
                message: (error.response?.data?.message || (error as Error).message || 'An unknown error occurred') 
              })
            );
            return rejectWithValue(error.response?.data || error.message || error); // More detailed error info
        }
    }
);


export const userActions = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    GetOnlineFriends,
    GetFriends,
    SearchFriends // Added SearchFriends to the exported object
}
