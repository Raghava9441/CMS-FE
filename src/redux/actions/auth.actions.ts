import { NavigateFunction } from "react-router-dom";
import { userApi } from "../../api/api";
import { loginUserStart, loginUserSuccess, logoutUserStart, logoutUserSuccess } from "../slices/authSlice";
import { AppDispatch } from "../store";
import appRoutes from "../../routes/routePaths";


export const loginUser = (user: { email: string, password: string }, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loginUserStart()); // Set loading state to true
        const response = await userApi.login(user);
        // console.log(response.data)
        dispatch(loginUserSuccess(response.data));
        navigate(appRoutes.DASHBOARD);
        return response.data;
    } catch (error) {
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000,
        });
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
        toast.error(error.message || 'Failed to fetch user', {
            autoClose: 3000, // Auto close after 3 seconds
        });
    }
};


export const authActions = {
    loginUser,
    logoutUser
}