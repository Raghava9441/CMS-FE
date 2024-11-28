import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { studentApi } from '@api/api';
import { Student } from '@models/student.models';
import { createStudentStart, createStudentSuccess, deleteStudentStart, deleteStudentSuccess, fetchStudentByIdStart, fetchStudentByIdSuccess, fetchStudentsStart, fetchStudentsSuccess, updateStudentStart, updateStudentSuccess } from '@redux/slices/student.slice';

const fetchStudents = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStudentsStart());
        const response = await studentApi.getStudents();
        dispatch(fetchStudentsSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch students', {
            autoClose: 3000,
        });
    }
};

const fetchStudentById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStudentByIdStart()); // Set loading state to true
        const response = await studentApi.getStudentById(id);
        dispatch(fetchStudentByIdSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch student', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const createStudents = (student: Omit<Student, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createStudentStart()); // Set loading state to true
        const response = await studentApi.createStudent(student);
        dispatch(createStudentSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch student', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const updateStudents = (student: Omit<Student, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateStudentStart()); // Set loading state to true
        const response = await studentApi.updateStudent(student, student._id);
        dispatch(updateStudentSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch student', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const deleteStudents = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteStudentStart());
        const response = await studentApi.deleteStudent(id);
        dispatch(deleteStudentSuccess(id));
        toast.info(response.message || 'Student deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.data || 'Failed to fetch student', {
            autoClose: 3000,
        });
    }
};


export const StudentActions = {
    fetchStudents,
    fetchStudentById,
    createStudents,
    updateStudents,
    deleteStudents,
}