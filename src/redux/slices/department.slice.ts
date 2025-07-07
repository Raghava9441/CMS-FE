import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepartment } from '@models/department.modals';
import { createDepartment, deleteDepartment, fetchDepartmentById, fetchDepartments, updateDepartment } from '@redux/actions/department.actions';

export interface DepartmentState {
    departments: IDepartment[];
    isLoading: boolean;
    error: string | null;
}

const initialState: DepartmentState = {
    departments: [],
    isLoading: false,
    error: null,
};

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<IDepartment[]>) => {
                state.departments = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchDepartments.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchDepartmentById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentById.fulfilled, (state, action: PayloadAction<IDepartment>) => {
                state.departments = state.departments.map((department) => {
                    if (department._id === action.payload._id) {
                        return action.payload;
                    }
                    return department;
                });
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchDepartmentById.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createDepartment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDepartment.fulfilled, (state, action: PayloadAction<IDepartment>) => {
                state.departments = [...state.departments, action.payload];
                state.isLoading = false;
                state.error = null;
            })
            .addCase(createDepartment.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateDepartment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<IDepartment>) => {
                state.departments = state.departments.map((department) => {
                    if (department._id === action.payload._id) {
                        return action.payload;
                    }
                    return department;
                });
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateDepartment.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteDepartment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDepartment.fulfilled, (state, action: PayloadAction<string>) => {
                state.departments = state.departments.filter((department) => department._id !== action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteDepartment.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default departmentSlice.reducer;
