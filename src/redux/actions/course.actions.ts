


import { Course } from '../../models/course.modal';
import { AppDispatch } from '../store';
import { createCourseStart, createCourseSuccess, deleteCourseStart, deleteCourseSuccess, fetchCourseByIdStart, fetchCourseByIdSuccess, fetchCoursesStart, fetchCoursesSuccess, updateCourseStart, updateCourseSuccess } from '../slices/course.slice';
import { toast } from 'react-toastify';
import { courseApi } from '@api/api';

const fetchCourses = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCoursesStart());
        const response = await courseApi.getCourses();
        console.log(response)
        dispatch(fetchCoursesSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch courses', {
            autoClose: 3000,
        });
    }
};

const fetchCourseById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCourseByIdStart()); // Set loading state to true
        const response = await courseApi.getCourseById(id);
        // console.log(response.data)
        dispatch(fetchCourseByIdSuccess(response.data.data)); // Pass data to success action
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch course', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const createCourse = (course: Course) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createCourseStart()); // Set loading state to true
        const response = await courseApi.createCourse(course);
        dispatch(createCourseSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch course', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const updateCourse = (course: Omit<Course, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        // console.log(organization)
        dispatch(updateCourseStart()); // Set loading state to true
        const response = await courseApi.updateCourse(course, course.id);
        dispatch(updateCourseSuccess(response.data.data)); // Pass data to success action
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch course', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};

const deleteCourse = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCourseStart());
        const response = await courseApi.deleteCourse(id);
        dispatch(deleteCourseSuccess(id));
        toast.info(response.message || 'Course deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        // console.log(error)
        toast.error(error.response.data.data || 'Failed to fetch course', {
            autoClose: 3000,
        });
    }
};


export const courseActions = {
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
}