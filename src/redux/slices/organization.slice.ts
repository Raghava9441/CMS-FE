import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Organization {
    __v: number;
    _id: string;
    name: string;
    category: string;
    number: string;
    address: Address;
    logo: string;
    website: string;
    contactEmail: string;
    contactPhone: string;
    establishedDate: string;
    description: string;
    socialLinks: SocialLinks;
    createdAt: string;
    updatedAt: string;
}

interface NewApiResponseData {
    organizations: Organization[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalOrganizations: number;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
}

interface OrganizationState {
    data: NewApiResponseData | null;
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
        fetchOrganizationsSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            console.log(action.payload)
            state.data = action.payload;
            console.log(state.data)
            state.error = null;
        },
        fetchOrganizationByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrganizationByIdSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            console.log(action.payload)
            state.data = action.payload;
            console.log(state.data)
            state.error = null;
        },
        createOrganizationStart(state) {
            state.loading = true;
            state.error = null;
        },
        createOrganizationSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            console.log(action.payload)
            state.data = action.payload;
            console.log(state.data)
            state.error = null;
        },
        updateOrganizationStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateOrganizationSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            console.log(action.payload)
            state.data = action.payload;
            console.log(state.data)
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
            console.log(state.data)
            state.error = null;
        },
    },
});

export const { fetchOrganizationsStart, fetchOrganizationsSuccess, fetchOrganizationByIdStart, fetchOrganizationByIdSuccess, createOrganizationStart, createOrganizationSuccess, updateOrganizationStart, updateOrganizationSuccess, deleteOrganizationStart, deleteOrganizationSuccess } = organizationSlice.actions;
export default organizationSlice.reducer;