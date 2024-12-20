//create organization actions to dispatch
import {  organizationApi } from '../../api/organization.api';
import { Organization } from '../../models/organization.modal';
import { AppDispatch } from '../store';
import { createOrganizationStart, createOrganizationSuccess, deleteOrganizationStart, deleteOrganizationSuccess, fetchOrganizationByIdStart, fetchOrganizationByIdSuccess, fetchOrganizationsStart, fetchOrganizationsSuccess, updateOrganizationStart, updateOrganizationSuccess } from '../slices/organization.slice';
import { toast } from 'react-toastify';
import { AsyncorganizationApi } from '@api/api';

const fetchOrganizations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchOrganizationsStart());
        const response = await AsyncorganizationApi.getOrganizations();
        console.log(response)
        dispatch(fetchOrganizationsSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch organizations', {
            autoClose: 3000,
        });
    }
};

const fetchOrganizationById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchOrganizationByIdStart()); // Set loading state to true
        const response = await AsyncorganizationApi.getOrganizationById(id);
        // console.log(response.data)
        dispatch(fetchOrganizationByIdSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const createOrganization = (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createOrganizationStart()); // Set loading state to true
        const response = await AsyncorganizationApi.createOrganization(organization);
        dispatch(createOrganizationSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const updateOrganization = (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        // console.log(organization)
        dispatch(updateOrganizationStart()); // Set loading state to true
        const response = await AsyncorganizationApi.updateOrganization(organization,organization.id);
        dispatch(updateOrganizationSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const deleteOrganization = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrganizationStart());
        const response = await AsyncorganizationApi.deleteOrganization(id);
        dispatch(deleteOrganizationSuccess(id));
        toast.info(response.message || 'Organization deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        // console.log(error)
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000,
        });
    }
};


export const organizationActions = {
    fetchOrganizations,
    fetchOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization,
}