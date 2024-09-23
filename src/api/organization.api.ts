import { ApiResponse, ApiResponseError, Organization } from '../models/organization.modal';
import { axiosInstance } from '../utils/axiosInstance';

async function getOrganizations(): Promise<ApiResponse<Organization[]> | ApiResponseError> {
    try {
        const response = await axiosInstance.get<ApiResponse<Organization[]>>('/organizations');
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}
async function getOrganizationById(id: string): Promise<ApiResponse<Organization> | ApiResponseError> {
    try {
        const response = await axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

async function createOrganization(organization: Omit<Organization, 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Organization> | ApiResponseError> {
    try {
        const response = await axiosInstance.post<ApiResponse<Organization>>('/organizations', organization);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

export async function updateOrganization(organization: Omit<Organization, 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Organization> | ApiResponseError> {
    try {
        const response = await axiosInstance.put<ApiResponse<Organization>>('/organizations', organization);
        return response.data;
    } catch (error) {
        return error as ApiResponseError;
    }
}

export async function deleteOrganization(id: string): Promise<ApiResponse<Organization> | ApiResponseError> {
    try {
        const response = await axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error?.response?.data as ApiResponseError;
        } else {
            throw new Error(error, 'An unexpected error occurred');
        }
    }
}

export const AsyncorganizationApi = {
    getOrganizations: () => axiosInstance.get<ApiResponse<Organization[]>>('/organizations'),
    getOrganizationById: (id: string) => axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`),
    createOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.post<ApiResponse<Organization>>('/organizations', organization),
    updateOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.put<ApiResponse<Organization>>('/organizations', organization),
    deleteOrganization: (id: string) => axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`)
}

export const organizationApi = {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization
}