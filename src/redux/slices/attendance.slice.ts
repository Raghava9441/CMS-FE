import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attendance } from '@models/attendance.models';

interface AttendanceApiResponseData {
    attendances: Attendance[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalPages: number;
    totalAttendances: number;
}

interface AttendanceState {
    data: AttendanceApiResponseData | null;
    loading: boolean;
    error: string | null;
    selectedAttendance: Attendance | null;
}

const initialState: AttendanceState = {
    data: null,
    loading: false,
    error: null,
    selectedAttendance: null,
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        // Fetch all attendances
        fetchAttendancesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAttendancesSuccess: (state, action: PayloadAction<AttendanceApiResponseData>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchAttendancesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Fetch attendance by id
        fetchAttendanceByIdStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAttendanceByIdSuccess: (state, action: PayloadAction<AttendanceApiResponseData>) => {
            state.loading = false;
            if (action.payload.attendances && action.payload.attendances.length > 0) {
                state.selectedAttendance = action.payload.attendances[0];
            }
        },
        fetchAttendanceByIdFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create attendance
        createAttendanceStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createAttendanceSuccess: (state, action: PayloadAction<AttendanceApiResponseData>) => {
            state.loading = false;
            if (state.data) {
                if (action.payload.attendances && action.payload.attendances.length > 0) {
                    state.data.attendances.push(action.payload.attendances[0]);
                    state.data.totalAttendances += 1;
                }
            }
        },
        createAttendanceFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update attendance
        updateAttendanceStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAttendanceSuccess: (state, action: PayloadAction<AttendanceApiResponseData>) => {
            state.loading = false;
            if (state.data && action.payload.attendances && action.payload.attendances.length > 0) {
                const updatedAttendance = action.payload.attendances[0];
                const index = state.data.attendances.findIndex(a => a._id === updatedAttendance._id);
                if (index !== -1) {
                    state.data.attendances[index] = updatedAttendance;
                }
            }
            if (state.selectedAttendance && action.payload.attendances && action.payload.attendances.length > 0) {
                const updatedAttendance = action.payload.attendances[0];
                if (state.selectedAttendance._id === updatedAttendance._id) {
                    state.selectedAttendance = updatedAttendance;
                }
            }
        },
        updateAttendanceFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete attendance
        deleteAttendanceStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteAttendanceSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            if (state.data) {
                state.data.attendances = state.data.attendances.filter(a => a._id !== action.payload);
                state.data.totalAttendances -= 1;
            }
            if (state.selectedAttendance && state.selectedAttendance._id === action.payload) {
                state.selectedAttendance = null;
            }
        },
        deleteAttendanceFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Bulk mark attendance
        markBulkAttendanceStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        markBulkAttendanceSuccess: (state, action: PayloadAction<AttendanceApiResponseData>) => {
            state.loading = false;
            if (state.data && action.payload.attendances) {
                // Replace existing attendance records for the same class and date
                const newAttendances = action.payload.attendances;
                newAttendances.forEach(newAttendance => {
                    const existingIndex = state.data!.attendances.findIndex(
                        a => a.classId === newAttendance.classId &&
                            a.studentId === newAttendance.studentId &&
                            new Date(a.date).toDateString() === new Date(newAttendance.date).toDateString()
                    );
                    if (existingIndex !== -1) {
                        state.data!.attendances[existingIndex] = newAttendance;
                    } else {
                        state.data!.attendances.push(newAttendance);
                        state.data!.totalAttendances += 1;
                    }
                });
            }
        },
        markBulkAttendanceFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Clear selected attendance
        clearSelectedAttendance: (state) => {
            state.selectedAttendance = null;
        },
        // Clear error
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    fetchAttendancesStart,
    fetchAttendancesSuccess,
    fetchAttendancesFailure,
    fetchAttendanceByIdStart,
    fetchAttendanceByIdSuccess,
    fetchAttendanceByIdFailure,
    createAttendanceStart,
    createAttendanceSuccess,
    createAttendanceFailure,
    updateAttendanceStart,
    updateAttendanceSuccess,
    updateAttendanceFailure,
    deleteAttendanceStart,
    deleteAttendanceSuccess,
    deleteAttendanceFailure,
    markBulkAttendanceStart,
    markBulkAttendanceSuccess,
    markBulkAttendanceFailure,
    clearSelectedAttendance,
    clearError,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
