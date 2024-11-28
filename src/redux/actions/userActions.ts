//create user actions to dispatch
import { AppDispatch } from '../store';
import { createUserStart, createUserSuccess, deleteUserStart, deleteUserSuccess, fetchUserByIdStart, fetchUserByIdSuccess, fetchUsersStart, fetchUsersSuccess, updateUserStart, updateUserSuccess } from '../slices/users.slice';
import { toast } from 'react-toastify';
import { userApi } from '../../api/api';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchUsersStart()); // Set loading state to true
        // const response = await authservice.getallUsers();
        const response = await userApi.getusers();
        // console.log(response.data.data)
        dispatch(fetchUsersSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.message || 'Failed to fetch users', {
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
        toast.error(error.message || 'Failed to fetch user', {
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
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
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
