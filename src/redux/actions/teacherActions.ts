import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { teacherApi } from '@api/api';
import { Teacher } from '@models/teacher.modals';
import { createTeacherStart, createTeacherSuccess, deleteTeacherStart, deleteTeacherSuccess, fetchTeacherByIdStart, fetchTeacherByIdSuccess, fetchTeachersStart, fetchTeachersSuccess, updateTeacherStart, updateTeacherSuccess } from '@redux/slices/Teacher.slice';

const fetchTeachers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchTeachersStart());
        const response = await teacherApi.getTeachers();
        dispatch(fetchTeachersSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch organizations', {
            autoClose: 3000,
        });
    }
};

const fetchTeacherById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchTeacherByIdStart()); // Set loading state to true
        const response = await teacherApi.getTeacherById(id);
        dispatch(fetchTeacherByIdSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const createTeachers = (organization: Omit<Teacher, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createTeacherStart()); // Set loading state to true
        const response = await teacherApi.createTeacher(organization);
        dispatch(createTeacherSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const updateTeachers = (teacher: Omit<Teacher, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateTeacherStart()); // Set loading state to true
        if (teacher._id) {
            const response = await teacherApi.updateTeacher(teacher, teacher._id);
            dispatch(updateTeacherSuccess(response.data.data)); // Pass data to success action
            return response.data;
        } else {
            throw new Error('Teacher ID is required for update');
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message || 'Failed to fetch organization', {
                autoClose: 3000, // Auto close after 3 seconds
            });
        }
    };
}

const deleteTeachers = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteTeacherStart());
        const response = await teacherApi.deleteTeacher(id);
        dispatch(deleteTeacherSuccess(id));
        toast.info(response.message || 'Organization deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.data || 'Failed to fetch organization', {
            autoClose: 3000,
        });
    }
};


export const TeacherActions = {
    fetchTeachers,
    fetchTeacherById,
    createTeachers,
    updateTeachers,
    deleteTeachers,
}