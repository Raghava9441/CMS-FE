//create organization actions to dispatch
import { organizationApi } from '../../api/organization.api';
import { Organization } from '../../models/organization.modal';
import { AppDispatch } from '../store';
import { createOrganizationStart, createOrganizationSuccess, deleteOrganizationStart, deleteOrganizationSuccess, fetchOrganizationByIdStart, fetchOrganizationByIdSuccess, fetchOrganizationsStart, fetchOrganizationsSuccess, updateOrganizationStart, updateOrganizationSuccess } from '../slices/organization.slice';
import { toast } from 'react-toastify';
import { AsyncorganizationApi } from '@api/api';
import { Params } from '@models/pagination.modals';
import { parseQueryParams } from '@utils/parseQueryParams';

const fetchOrganizations = (params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);

        dispatch(fetchOrganizationsStart());
        const response = await AsyncorganizationApi.getOrganizations(queryParams);
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
        const response = await AsyncorganizationApi.updateOrganization(organization, organization.id);
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
        toast.info('Organization deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        toast.error((error as { response?: { data?: { data?: string } } })?.response?.data?.data || 'Failed to fetch organization', {
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