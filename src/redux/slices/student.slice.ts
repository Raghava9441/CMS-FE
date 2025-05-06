import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
    __v: number;
    _id: string;
    userId: string;
    name: string;
    phone: string;
    email: string;
    organizationId: string;
    enrolledCoursesIds?: string[];
    currentClassId?: string;
    dateOfBirth: Date;
    address: Address;
    emergencyContacts: EmergencyContact[];
    enrollmentDate: Date;
    graduationDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface NewApiResponseData {
    students: Student[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalStudents: number;
}

interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

interface StudentState {
    data: NewApiResponseData | null;
    loading: boolean;
    error: string | null;
}

const initialState: StudentState = {
    data: null,
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchStudentsSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        fetchStudentByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchStudentByIdSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        createStudentStart(state) {
            state.loading = true;
            state.error = null;
        },
        createStudentSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        updateStudentStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateStudentSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        deleteStudentStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteStudentSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            if (state.data) {
                state.data.students = state.data.students.filter((student) => student._id !== action.payload);
            }
            // console.log(state.data)
            state.error = null;
        },
    },
});

export const { fetchStudentsStart, fetchStudentsSuccess, fetchStudentByIdStart, fetchStudentByIdSuccess, createStudentStart, createStudentSuccess, updateStudentStart, updateStudentSuccess, deleteStudentStart, deleteStudentSuccess } = studentSlice.actions;
export default studentSlice.reducer;