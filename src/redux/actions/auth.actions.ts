import { NavigateFunction } from "react-router-dom";
import { userApi } from "../../api/api";
import { loginUserFailure, loginUserStart, loginUserSuccess, logoutUserStart, logoutUserSuccess, ShowSnackbar } from "../slices/authSlice";
import { AppDispatch } from "../store";
import appRoutes from "../../routes/routePaths";


export const loginUser = (user: { email: string, password: string }, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loginUserStart());
        const response = await userApi.login(user);
        dispatch(loginUserSuccess(response.data));
        navigate(appRoutes.DASHBOARD);
        return response.data;
    } catch (error) {
        dispatch(loginUserFailure(error.response.data.data))
        dispatch(
            ShowSnackbar({
                severity: 'error',
                message: error.response.data.data,
            })
        );
    }
};

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
        dispatch(logoutUserStart());
        const response = await userApi.logout();
        dispatch(logoutUserSuccess(response.data));
        navigate(appRoutes.LOGIN);
        return response.data;
    } catch (error) {
        dispatch(
            ShowSnackbar({
                severity: 'error',
                message: error.response.data.data,
            })
        );
    }
};


export const authActions = {
    loginUser,
    logoutUser
}