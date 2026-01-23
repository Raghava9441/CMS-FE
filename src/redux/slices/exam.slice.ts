import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponseData, Exam } from "../../types/exam.modal";

interface ExamState {
    data: ApiResponseData<Exam[]> | null;
    loading: boolean;
    error: string | null;
}

const initialState: ExamState = {
    data: null,
    loading: false,
    error: null,
};

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        fetchExamsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchExamsSuccess(state, action: PayloadAction<ApiResponseData<Exam[]>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchExamByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchExamByIdSuccess(state, action: PayloadAction<ApiResponseData<Exam>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        createExamStart(state) {
            state.loading = true;
            state.error = null;
        },
        createExamSuccess(state, action: PayloadAction<ApiResponseData<Exam>>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        updateExamStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateExamSuccess(state, action: PayloadAction<ApiResponseData<Exam>>) {
            state.loading = false;
            if (state.data) {
                state.data.exams = [...(state.data.exams || []), action.payload as Exam];
            } else {
                state.data = { ...action.payload as Exam, exams: [action.payload as Exam] };
            }
            state.error = null;
        },
        deleteExamStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteExamSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            if (state.data) {
                state.data.exams = state.data.exams.filter((exam) => exam._id !== action.payload);
            }
            state.error = null;
        },
    },
});

export const {
    fetchExamsStart,
    fetchExamsSuccess,
    fetchExamByIdStart,
    fetchExamByIdSuccess,
    createExamStart,
    createExamSuccess,
    updateExamStart,
    updateExamSuccess,
    deleteExamStart,
    deleteExamSuccess
} = examSlice.actions;

export default examSlice.reducer;
