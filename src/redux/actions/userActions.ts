//create user actions to dispatch
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authservice, User } from '../../api/auth.api';
import { ApiResponse } from '../../models/organization.modal';
import { AppDispatch } from '../store';
import { createUserStart, createUserSuccess, deleteUserStart, deleteUserSuccess, fetchUserByIdStart, fetchUserByIdSuccess, fetchUsersFailure, fetchUsersStart, fetchUsersSuccess, updateUserStart, updateUserSuccess } from '../slices/users.slice';
import { useNotifications } from '@toolpad/core/useNotifications';
import { toast } from 'react-toastify';
import { create } from '@mui/material/styles/createTransitions';

// export const loginUser = createAsyncThunk('user/loginUser', async (user: { email: string, password: string }) => {
//     const response = await authservice.loginUser(user);
//     return response;
// });

// export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
//     const response = await authservice.logoutUser();
//     return response;
// });

// export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
//     const response = await authservice.getallUsers();
//     return response;
// });

// export const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
//     const response = await authservice.getUserById(id);
//     return response;
// });

// export const createUser = createAsyncThunk<ApiResponse<User>, Omit<User, "password" | "accessToken" | "refreshToken">>('user/createUser', async (user: any) => {
//     const response = await authservice.createUser(user);
//     return response;
// });

// export const updateUser = createAsyncThunk<ApiResponse<User>, Omit<User, "password" | "accessToken" | "refreshToken">>('user/updateUser', async (user) => {
//     const response = await authservice.updateUser(user);
//     return response;
// });

// export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string) => {
//     const response = await authservice.deleteUser(id);
//     return response;
// });

// export const userActions = {
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//     loginUser,
//     logoutUser
// }

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchUsersStart()); // Set loading state to true
        const response = await authservice.getallUsers();
        console.log(response.data)
        dispatch(fetchUsersSuccess(response.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.message || 'Failed to fetch users', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const fetchUserById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchUserByIdStart()); // Set loading state to true
        const response = await authservice.getUserById(id);
        console.log(response.data)
        dispatch(fetchUserByIdSuccess(response.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const createUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createUserStart()); // Set loading state to true
        const response = await authservice.createUser(user);
        dispatch(createUserSuccess(response.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const updateUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateUserStart()); // Set loading state to true
        const response = await authservice.updateUser(user);
        dispatch(updateUserSuccess(response.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteUserStart()); // Set loading state to true
        const response = await authservice.deleteUser(id);
        dispatch(deleteUserSuccess(response.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};


export const userActions = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
}
