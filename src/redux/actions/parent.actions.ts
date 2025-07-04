import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { parentApi } from '@api/api';
import { Parent } from '@models/parent.models';
import { createParentStart, createParentSuccess, deleteParentStart, deleteParentSuccess, fetchParentByIdStart, fetchParentByIdSuccess, fetchParentsStart, fetchParentsSuccess, updateParentStart, updateParentSuccess } from '@redux/slices/parent.slice';
import { Params } from '@models/pagination.modals';
import { parseQueryParams } from '@utils/parseQueryParams';

const fetchParents = (params:Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchParentsStart());
        const response = await parentApi.getParents(queryParams);
        dispatch(fetchParentsSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch organizations', {
            autoClose: 3000,
        });
    }
};

const fetchParentById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchParentByIdStart()); // Set loading state to true
        const response = await parentApi.getParentById(id);
        dispatch(fetchParentByIdSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const createParents = (organization: Omit<Parent, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createParentStart()); // Set loading state to true
        const response = await parentApi.createParent(organization);
        dispatch(createParentSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const updateParents = (teacher: Omit<Parent, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateParentStart()); // Set loading state to true
        if (teacher._id) {
            const response = await parentApi.updateParent(teacher, teacher._id);
            dispatch(updateParentSuccess(response.data.data)); // Pass data to success action
            return response.data;
        } else {
            throw new Error('Teacher ID is required for update');
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message || 'Failed to fetch organization', {
                autoClose: 3000, // Auto close after 3 seconds
            });
        }
    };
}

const deleteParents = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteParentStart());
        const response = await parentApi.deleteParent(id);
        dispatch(deleteParentSuccess(id));
        toast.info(response.message || 'Organization deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000,
        });
    }
};


export const ParentActions = {
    fetchParents,
    fetchParentById,
    createParents,
    updateParents,
    deleteParents,
}