import { AppDispatch } from "../store";
import { classApi } from "../../api/api";
import {
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
} from "../slices/class.slice";
import { CreateClassRequest, UpdateClassRequest, BulkDeleteClassesRequest, TransferStudentRequest } from "../../types/class.modals";
import { toast } from "react-toastify";

export const getClasses = (params: string = '') => async (dispatch: AppDispatch) => {
  try {
    dispatch(getClassesStart());
    const response = await classApi.getClasses(params);
    dispatch(getClassesSuccess(response.data.data!));
  } catch (error: any) {
    dispatch(getClassesFailure(error.response?.data?.data || 'Failed to fetch classes'));
    toast.error(error.response?.data?.data || 'Failed to fetch classes', {
      autoClose: 3000,
    });
  }
};

export const getClassById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getClassByIdStart());
    const response = await classApi.getClassById(id);
    dispatch(getClassByIdSuccess(response.data.data!));
  } catch (error: any) {
    dispatch(getClassByIdFailure(error.response?.data?.data || 'Failed to fetch class'));
    toast.error(error.response?.data?.data || 'Failed to fetch class', {
      autoClose: 3000,
    });
  }
};

export const createClass = (classData: CreateClassRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(createClassStart());
    const response = await classApi.createClass(classData);
    dispatch(createClassSuccess(response.data.data!));
    toast.success('Class created successfully', {
      autoClose: 3000,
    });
    return response.data.data;
  } catch (error: any) {
    dispatch(createClassFailure(error.response?.data?.data || 'Failed to create class'));
    toast.error(error.response?.data?.data || 'Failed to create class', {
      autoClose: 3000,
    });
  }
};

export const updateClass = (classData: UpdateClassRequest, _id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateClassStart());
    const response = await classApi.updateClass(classData, _id);
    dispatch(updateClassSuccess(response.data.data!));
    toast.success('Class updated successfully', {
      autoClose: 3000,
    });
    return response.data.data;
  } catch (error: any) {
    dispatch(updateClassFailure(error.response?.data?.data || 'Failed to update class'));
    toast.error(error.response?.data?.data || 'Failed to update class', {
      autoClose: 3000,
    });
  }
};

export const deleteClass = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deleteClassStart());
    await classApi.deleteClass(id);
    dispatch(deleteClassSuccess(id));
    toast.success('Class deleted successfully', {
      autoClose: 3000,
    });
  } catch (error: any) {
    dispatch(deleteClassFailure(error.response?.data?.data || 'Failed to delete class'));
    toast.error(error.response?.data?.data || 'Failed to delete class', {
      autoClose: 3000,
    });
  }
};

export const bulkCreateClasses = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bulkCreateClassesStart());
    const response = await classApi.bulkCreateClasses(formData);
    dispatch(bulkCreateClassesSuccess(response.data.data!));
    toast.success('Classes created successfully', {
      autoClose: 3000,
    });
    return response.data.data;
  } catch (error: any) {
    dispatch(bulkCreateClassesFailure(error.response?.data?.data || 'Failed to create classes'));
    toast.error(error.response?.data?.data || 'Failed to create classes', {
      autoClose: 3000,
    });
  }
};

export const bulkDeleteClasses = (data: BulkDeleteClassesRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bulkDeleteClassesStart());
    await classApi.bulkDeleteClasses(data);
    dispatch(bulkDeleteClassesSuccess(data.classIds));
    toast.success('Classes deleted successfully', {
      autoClose: 3000,
    });
  } catch (error: any) {
    dispatch(bulkDeleteClassesFailure(error.response?.data?.data || 'Failed to delete classes'));
    toast.error(error.response?.data?.data || 'Failed to delete classes', {
      autoClose: 3000,
    });
  }
};

export const transferStudent = (data: TransferStudentRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(transferStudentStart());
    await classApi.transferStudent(data);
    dispatch(transferStudentSuccess());
    toast.success('Student transferred successfully', {
      autoClose: 3000,
    });
  } catch (error: any) {
    dispatch(transferStudentFailure(error.response?.data?.data || 'Failed to transfer student'));
    toast.error(error.response?.data?.data || 'Failed to transfer student', {
      autoClose: 3000,
    });
  }
};

export const getClassesByAcademicYear = (academicYear: string, params: string = '') => async (dispatch: AppDispatch) => {
  try {
    dispatch(getClassesStart());
    const response = await classApi.getClassesByAcademicYear(academicYear, params);
    dispatch(getClassesSuccess(response.data.data!));
  } catch (error: any) {
    dispatch(getClassesFailure(error.response?.data?.data || 'Failed to fetch classes'));
    toast.error(error.response?.data?.data || 'Failed to fetch classes', {
      autoClose: 3000,
    });
  }
};

export const getClassesByTeacher = (teacherId: string, params: string = '') => async (dispatch: AppDispatch) => {
  try {
    dispatch(getClassesStart());
    const response = await classApi.getClassesByTeacher(teacherId, params);
    dispatch(getClassesSuccess(response.data.data!));
  } catch (error: any) {
    dispatch(getClassesFailure(error.response?.data?.data || 'Failed to fetch classes'));
    toast.error(error.response?.data?.data || 'Failed to fetch classes', {
      autoClose: 3000,
    });
  }
};

export const getClassesByCourse = (courseId: string, params: string = '') => async (dispatch: AppDispatch) => {
  try {
    dispatch(getClassesStart());
    const response = await classApi.getClassesByCourse(courseId, params);
    dispatch(getClassesSuccess(response.data.data!));
  } catch (error: any) {
    dispatch(getClassesFailure(error.response?.data?.data || 'Failed to fetch classes'));
    toast.error(error.response?.data?.data || 'Failed to fetch classes', {
      autoClose: 3000,
    });
  }
};

export const classActions = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  bulkCreateClasses,
  bulkDeleteClasses,
  transferStudent,
  getClassesByAcademicYear,
  getClassesByTeacher,
  getClassesByCourse,
};
