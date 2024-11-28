import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Parent {
    __v: number;
    _id: string;
    name: string;
    phone: string;
    userId: string; // Use string for ObjectId reference to User
    childrenIds?: string[]; // Use string[] for ObjectId references to Student
    organizationId: string; // Use string for ObjectId reference to Organization
    dateOfBirth: Date;
    address: Address;
    email: string;
    occupation?: string; // Optional field
    relationshipToStudent: string;
    emergencyContacts: EmergencyContact[];
    createdAt: string; // Timestamp for when the parent was created
    updatedAt: string; // Timestamp for when the parent was last updated
}

interface NewApiResponseData {
    parents: Parent[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalParents: number;
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

interface Preferences {
    notifications?: boolean;
    language?: string;
    theme?: string;
    timezone?: string;
    currency?: string;
    dateFormat?: string;
}

interface Organization {
    id: string;
    name: string;
}

interface Student {
    id: string;
    name: string;
}

interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

interface ParentState {
    data: NewApiResponseData | null;
    loading: boolean;
    error: string | null;
}

const initialState: ParentState = {
    data: null,
    loading: false,
    error: null,
};

const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        fetchParentsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchParentsSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        fetchParentByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchParentByIdSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        createParentStart(state) {
            state.loading = true;
            state.error = null;
        },
        createParentSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        updateParentStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateParentSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        deleteParentStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteParentSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            if (state.data) {
                state.data.parents = state.data.parents.filter((parent) => parent._id !== action.payload);
            }
            // console.log(state.data)
            state.error = null;
        },
    },
});

export const { fetchParentsStart, fetchParentsSuccess, fetchParentByIdStart, fetchParentByIdSuccess, createParentStart, createParentSuccess, updateParentStart, updateParentSuccess, deleteParentStart, deleteParentSuccess } = parentSlice.actions;
export default parentSlice.reducer;