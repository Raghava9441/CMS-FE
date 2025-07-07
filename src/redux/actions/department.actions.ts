import { departmentApi } from "@api/api";
import { ShowSnackbar } from "@redux/slices/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchDepartments = createAsyncThunk(
    "departments/fetch-departments",
    async (arg, { rejectWithValue, dispatch }) => {
        try {
            const response = await departmentApi.getDepartments()
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(" error:", error)
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

export const fetchDepartmentById = createAsyncThunk(
    "departments/fetch-department-by-id",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await departmentApi.getDepartmentById(id);
            return data;
        } catch (error) {
            console.log(" error:", error)
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

export const createDepartment = createAsyncThunk(
    "departments/create-department",
    async (department, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await departmentApi.createDepartment(department);
            return data;
        } catch (error) {
            console.log(" error:", error)
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

export const updateDepartment = createAsyncThunk(
    "departments/update-department",
    async (department, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await departmentApi.updateDepartment(department);
            return data;
        } catch (error) {
            console.log(" error:", error)
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "departments/delete-department",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await departmentApi.deleteDepartment(id);
            return data;
        } catch (error) {
            console.log(" error:", error)
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);


