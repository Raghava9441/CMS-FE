import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiResponseData, Organization} from "@models/organization.modal.ts";

interface OrganizationState {
    data: ApiResponseData<Organization[]> | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrganizationState = {
    data: null,
    loading: false,
    error: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        fetchOrganizationsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrganizationsSuccess(state, action: PayloadAction<ApiResponseData<Organization[]>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchOrganizationByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrganizationByIdSuccess(state, action: PayloadAction<ApiResponseData<Organization>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        createOrganizationStart(state) {
            state.loading = true;
            state.error = null;
        },
        createOrganizationSuccess(state, action: PayloadAction<ApiResponseData<Organization>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        updateOrganizationStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateOrganizationSuccess(state, action: PayloadAction<ApiResponseData<Organization>>) {
            state.loading = false;
            if (state.data) {
                state.data.organizations = [...(state.data.organizations || []), action.payload as Organization];
            } else {
                state.data = {...action.payload as Organization, organizations: [action.payload as Organization]};
            }
            state.error = null;
        },
        deleteOrganizationStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteOrganizationSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            if (state.data) {
                state.data.organizations = state.data.organizations.filter((org) => org._id !== action.payload);
            }
            state.error = null;
        },
    },
});

export const {
    fetchOrganizationsStart,
    fetchOrganizationsSuccess,
    fetchOrganizationByIdStart,
    fetchOrganizationByIdSuccess,
    createOrganizationStart,
    createOrganizationSuccess,
    updateOrganizationStart,
    updateOrganizationSuccess,
    deleteOrganizationStart,
    deleteOrganizationSuccess
} = organizationSlice.actions;
export default organizationSlice.reducer;