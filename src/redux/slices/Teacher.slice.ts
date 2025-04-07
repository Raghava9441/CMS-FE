import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Teacher {
    __v: number;
    _id: string;
    userId: string;
    name: string;
    phone: string;
    email: string;
    organizationId: string;
    departments?: string[];
    subjects?: string[];
    qualifications?: string;
    experience?: number;
    officeHours?: string;
    researchInterests?: string;
    publications?: string[];
    professionalMemberships?: string[];
    coursesTaught?: string[];
    performanceReviews?: string[];
    specialResponsibilities?: string;
    teachingPhilosophy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface NewApiResponseData {
    teachers: Teacher[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalTeachers: number;
}

interface TeacherState {
    data: NewApiResponseData | null;
    loading: boolean;
    error: string | null;
}

const initialState: TeacherState = {
    data: null,
    loading: false,
    error: null,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        fetchTeachersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTeachersFailure(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = null;
        },
        fetchTeachersSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        fetchTeacherByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTeacherByIdSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        createTeacherStart(state) {
            state.loading = true;
            state.error = null;
        },
        createTeacherSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        updateTeacherStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateTeacherSuccess(state, action: PayloadAction<NewApiResponseData>) {
            state.loading = false;
            // console.log(action.payload)
            state.data = action.payload;
            state.error = null;
        },
        deleteTeacherStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteTeacherSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            if (state.data) {
                state.data.teachers = state.data.teachers.filter((teacher) => teacher._id !== action.payload);
            }
            // console.log(state.data)
            state.error = null;
        },
    },
});

export const { fetchTeachersStart, fetchTeachersSuccess, fetchTeacherByIdStart, fetchTeacherByIdSuccess, createTeacherStart, createTeacherSuccess, updateTeacherStart, updateTeacherSuccess, deleteTeacherStart, deleteTeacherSuccess,fetchTeachersFailure } = teacherSlice.actions;
export default teacherSlice.reducer;