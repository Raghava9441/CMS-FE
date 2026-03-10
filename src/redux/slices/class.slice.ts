import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Class, ClassesApiResponseData } from '../../types/class.modals';

interface ClassState {
    data: ClassesApiResponseData | null;
    selectedClass: Class | null;
    loading: boolean;
    error: string | null;
    success: string | null;
}

const initialState: ClassState = {
    data: null,
    selectedClass: null,
    loading: false,
    error: null,
    success: null,
};

interface SnackbarState {
    severity: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        // Fetch classes
        getClassesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        getClassesSuccess: (state, action: PayloadAction<ClassesApiResponseData>) => {
            state.loading = false;
            state.data = action.payload;
            state.success = 'Classes fetched successfully';
        },
        getClassesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Fetch class by id
        getClassByIdStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        getClassByIdSuccess: (state, action: PayloadAction<Class>) => {
            state.loading = false;
            state.selectedClass = action.payload;
            state.success = 'Class fetched successfully';
        },
        getClassByIdFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create class
        createClassStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        createClassSuccess: (state, action: PayloadAction<Class>) => {
            state.loading = false;
            if (state.data) {
                state.data.classes.push(action.payload);
                state.data.total += 1;
            }
            state.success = 'Class created successfully';
        },
        createClassFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update class
        updateClassStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        updateClassSuccess: (state, action: PayloadAction<Class>) => {
            state.loading = false;
            if (state.data) {
                const index = state.data.classes.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.data.classes[index] = action.payload;
                }
            }
            if (state.selectedClass && state.selectedClass._id === action.payload._id) {
                state.selectedClass = action.payload;
            }
            state.success = 'Class updated successfully';
        },
        updateClassFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete class
        deleteClassStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        deleteClassSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            if (state.data) {
                state.data.classes = state.data.classes.filter(c => c._id !== action.payload);
                state.data.total -= 1;
            }
            if (state.selectedClass && state.selectedClass._id === action.payload) {
                state.selectedClass = null;
            }
            state.success = 'Class deleted successfully';
        },
        deleteClassFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Bulk create classes
        bulkCreateClassesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        bulkCreateClassesSuccess: (state, action: PayloadAction<ClassesApiResponseData>) => {
            state.loading = false;
            if (state.data) {
                state.data.classes.push(...action.payload.classes);
                state.data.total += action.payload.classes.length;
            } else {
                state.data = action.payload;
            }
            state.success = 'Classes created successfully';
        },
        bulkCreateClassesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Bulk delete classes
        bulkDeleteClassesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        bulkDeleteClassesSuccess: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            if (state.data) {
                state.data.classes = state.data.classes.filter(c => !action.payload.includes(c._id));
                state.data.total -= action.payload.length;
            }
            if (state.selectedClass && action.payload.includes(state.selectedClass._id)) {
                state.selectedClass = null;
            }
            state.success = 'Classes deleted successfully';
        },
        bulkDeleteClassesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Transfer student
        transferStudentStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        transferStudentSuccess: (state) => {
            state.loading = false;
            state.success = 'Student transferred successfully';
        },
        transferStudentFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Clear alerts
        clearAlerts: (state) => {
            state.error = null;
            state.success = null;
        },

    // Clear selected class
    clearSelectedClass: (state) => {
      state.selectedClass = null;
    },
    // Show snackbar
    ShowSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      // This is typically handled in a separate slice, but added here for consistency
    },
  },
});

export const {
    getClassesStart,
    getClassesSuccess,
    getClassesFailure,
    getClassByIdStart,
    getClassByIdSuccess,
    getClassByIdFailure,
    createClassStart,
    createClassSuccess,
    createClassFailure,
    updateClassStart,
    updateClassSuccess,
    updateClassFailure,
    deleteClassStart,
    deleteClassSuccess,
    deleteClassFailure,
    bulkCreateClassesStart,
    bulkCreateClassesSuccess,
    bulkCreateClassesFailure,
    bulkDeleteClassesStart,
    bulkDeleteClassesSuccess,
    bulkDeleteClassesFailure,
    transferStudentStart,
    transferStudentSuccess,
    transferStudentFailure,
    clearAlerts,
    clearSelectedClass,
} = classSlice.actions;

export default classSlice.reducer;
