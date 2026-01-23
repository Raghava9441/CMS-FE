import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { attendanceApi } from '@api/api';
import { Attendance, BulkMarkAttendanceData, BulkDeleteAttendanceData } from '@models/attendance.models';
import {
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
} from '@redux/slices/attendance.slice';
import { Params } from '@models/pagination.modals';
import { parseQueryParams } from '@utils/parseQueryParams';

const fetchAttendances = (params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getAttendances(queryParams);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendancesSuccess(data));
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch attendances', {
            autoClose: 3000,
        });
        dispatch(fetchAttendancesFailure(error.response?.data?.data || 'Failed to fetch attendances'));
    }
};

const fetchAttendanceById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchAttendanceByIdStart());
        const response = await attendanceApi.getAttendanceById(id);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendanceByIdSuccess(data));
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch attendance', {
            autoClose: 3000,
        });
        dispatch(fetchAttendanceByIdFailure(error.response?.data?.data || 'Failed to fetch attendance'));
    }
};

const createAttendance = (attendance: Omit<Attendance, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createAttendanceStart());
        const response = await attendanceApi.createAttendance(attendance);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(createAttendanceSuccess(data));
        toast.success('Attendance created successfully', {
            autoClose: 3000,
        });
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to create attendance', {
            autoClose: 3000,
        });
        dispatch(createAttendanceFailure(error.response?.data?.data || 'Failed to create attendance'));
    }
};

const updateAttendance = (attendance: Omit<Attendance, 'createdAt' | 'updatedAt'>, id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateAttendanceStart());
        const response = await attendanceApi.updateAttendance(attendance, id);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(updateAttendanceSuccess(data));
        toast.success('Attendance updated successfully', {
            autoClose: 3000,
        });
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to update attendance', {
            autoClose: 3000,
        });
        dispatch(updateAttendanceFailure(error.response?.data?.data || 'Failed to update attendance'));
    }
};

const deleteAttendance = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAttendanceStart());
        await attendanceApi.deleteAttendance(id);
        dispatch(deleteAttendanceSuccess(id));
        toast.success('Attendance deleted successfully', {
            autoClose: 3000,
        });
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to delete attendance', {
            autoClose: 3000,
        });
        dispatch(deleteAttendanceFailure(error.response?.data?.data || 'Failed to delete attendance'));
    }
};

const getAttendanceByStudent = (studentId: string, params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getAttendanceByStudent(studentId, queryParams);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendancesSuccess(data));
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch student attendance', {
            autoClose: 3000,
        });
        dispatch(fetchAttendancesFailure(error.response?.data?.data || 'Failed to fetch student attendance'));
    }
};

const getAttendanceByClass = (classId: string, params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getAttendanceByClass(classId, queryParams);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendancesSuccess(data));
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch class attendance', {
            autoClose: 3000,
        });
        dispatch(fetchAttendancesFailure(error.response?.data?.data || 'Failed to fetch class attendance'));
    }
};

const getAttendanceByDate = (date: string, params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getAttendanceByDate(date, queryParams);
        // Ensure attendances is always an array
        const data = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendancesSuccess(data));
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch attendance by date', {
            autoClose: 3000,
        });
        dispatch(fetchAttendancesFailure(error.response?.data?.data || 'Failed to fetch attendance by date'));
    }
};

const getStudentAttendanceStats = (studentId: string, params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getStudentAttendanceStats(studentId, queryParams);
        // Note: Stats response has different format
        dispatch(fetchAttendancesSuccess({
            attendances: [],
            totalAttendances: 0,
            limit: 0,
            page: 0,
            totalPages: 0,
            serialNumberStartFrom: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        }));
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch student attendance stats', {
            autoClose: 3000,
        });
    }
};

const getClassAttendanceStats = (classId: string, params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);
        dispatch(fetchAttendancesStart());
        const response = await attendanceApi.getClassAttendanceStats(classId, queryParams);
        // Note: Stats response has different format
        dispatch(fetchAttendancesSuccess({
            attendances: [],
            totalAttendances: 0,
            limit: 0,
            page: 0,
            totalPages: 0,
            serialNumberStartFrom: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        }));
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to fetch class attendance stats', {
            autoClose: 3000,
        });
    }
};

const markBulkAttendance = (data: BulkMarkAttendanceData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(markBulkAttendanceStart());
        const response = await attendanceApi.markBulkAttendance(data);
        // Ensure attendances is always an array
        const formattedData = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(markBulkAttendanceSuccess(formattedData));
        toast.success('Bulk attendance marked successfully', {
            autoClose: 3000,
        });
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to mark bulk attendance', {
            autoClose: 3000,
        });
        dispatch(markBulkAttendanceFailure(error.response?.data?.data || 'Failed to mark bulk attendance'));
    }
};

const createBulkAttendances = (file: File) => async (dispatch: AppDispatch) => {
    try {
        dispatch(markBulkAttendanceStart());
        const formData = new FormData();
        formData.append('file', file);
        const response = await attendanceApi.createBulkAttendances(formData);
        // Ensure attendances is always an array
        const formattedData = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(markBulkAttendanceSuccess(formattedData));
        toast.success('Bulk attendances created successfully', {
            autoClose: 3000,
        });
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to create bulk attendances', {
            autoClose: 3000,
        });
        dispatch(markBulkAttendanceFailure(error.response?.data?.data || 'Failed to create bulk attendances'));
    }
};

const deleteBulkAttendances = (data: BulkDeleteAttendanceData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAttendanceStart());
        const response = await attendanceApi.deleteBulkAttendances(data);
        // Ensure attendances is always an array
        const formattedData = {
            ...response.data.data,
            attendances: ensureAttendanceArray(response.data.data.attendances)
        };
        dispatch(fetchAttendancesSuccess(formattedData));
        toast.success('Bulk attendances deleted successfully', {
            autoClose: 3000,
        });
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.data || 'Failed to delete bulk attendances', {
            autoClose: 3000,
        });
        dispatch(deleteAttendanceFailure(error.response?.data?.data || 'Failed to delete bulk attendances'));
    }
};

// Helper function to ensure attendance data is always an array of Attendance objects
const ensureAttendanceArray = (attendances: any): Attendance[] => {
    if (!attendances) return [];
    if (Array.isArray(attendances)) {
        // If it's an array of arrays, return the first array
        if (attendances.length > 0 && Array.isArray(attendances[0])) {
            return attendances[0];
        }
        // If it's an array of attendance objects, return as is
        return attendances;
    }
    // If it's a single attendance object, wrap in array
    return [attendances];
};

export const AttendanceActions = {
    fetchAttendances,
    fetchAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceByStudent,
    getAttendanceByClass,
    getAttendanceByDate,
    getStudentAttendanceStats,
    getClassAttendanceStats,
    markBulkAttendance,
    createBulkAttendances,
    deleteBulkAttendances,
};
