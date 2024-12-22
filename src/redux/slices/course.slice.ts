import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '@models/course.modals';

export interface CourseState {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CourseState = {
    courses: [],
    isLoading: false,
    error: null,
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchCoursesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchCoursesFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchCourseByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCourseByIdSuccess: (state, action: PayloadAction<Course>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchCourseByIdFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        createCourseStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createCourseSuccess: (state, action: PayloadAction<Course>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        createCourseFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateCourseStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateCourseSuccess: (state, action: PayloadAction<Course>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateCourseFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteCourseStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteCourseSuccess: (state, action: PayloadAction<string>) => {
            state.courses = state.courses.filter((course) => course._id !== action.payload);
            state.isLoading = false;
            state.error = null;
        },
        deleteCourseFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    fetchCourseByIdStart,
    fetchCourseByIdSuccess,
    fetchCourseByIdFailure,
    createCourseStart,
    createCourseSuccess,
    createCourseFailure,
    updateCourseStart,
    updateCourseSuccess,
    updateCourseFailure,
    deleteCourseStart,
    deleteCourseSuccess,
    deleteCourseFailure,
} = courseSlice.actions;

export default courseSlice.reducer;