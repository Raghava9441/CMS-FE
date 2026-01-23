import { examApi } from '../../api/api';
import { Exam } from '../../types/exam.modal';
import { AppDispatch } from '../store';
import { 
    createExamStart, 
    createExamSuccess, 
    deleteExamStart, 
    deleteExamSuccess, 
    fetchExamByIdStart, 
    fetchExamByIdSuccess, 
    fetchExamsStart, 
    fetchExamsSuccess, 
    updateExamStart, 
    updateExamSuccess 
} from '../slices/exam.slice';
import { toast } from 'react-toastify';
import { Params } from '@models/pagination.modals';
import { parseQueryParams } from '@utils/parseQueryParams';

const fetchExams = (params: Params) => async (dispatch: AppDispatch) => {
    try {
        const queryParams = parseQueryParams(params);

        dispatch(fetchExamsStart());
        const response = await examApi.getExams(queryParams);
        dispatch(fetchExamsSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.data || 'Failed to fetch exams', {
            autoClose: 3000,
        });
    }
};

const fetchExamById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchExamByIdStart());
        const response = await examApi.getExamById(id);
        dispatch(fetchExamByIdSuccess(response.data.data));
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to fetch exam', {
            autoClose: 3000,
        });
    }
};

const createExam = (exam: Omit<Exam, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createExamStart());
        const response = await examApi.createExam(exam);
        dispatch(createExamSuccess(response.data.data));
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to create exam', {
            autoClose: 3000,
        });
    }
};

const updateExam = (exam: Omit<Exam, 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateExamStart());
        const response = await examApi.updateExam(exam, exam._id);
        dispatch(updateExamSuccess(response.data.data));
        return response.data;
    } catch (error) {
        toast.error(error.response.data.data || 'Failed to update exam', {
            autoClose: 3000,
        });
    }
};

const deleteExam = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteExamStart());
        const response = await examApi.deleteExam(id);
        dispatch(deleteExamSuccess(id));
        toast.info('Exam deleted successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        toast.error((error as { response?: { data?: { data?: string } } })?.response?.data?.data || 'Failed to delete exam', {
            autoClose: 3000,
        });
    }
};

export const examActions = {
    fetchExams,
    fetchExamById,
    createExam,
    updateExam,
    deleteExam,
}
