import axios from 'axios';
import { userApi } from '@api/api';
import { envConfig } from "../config/env.config";

export interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errors: unknown[];
    stack: string;
}

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public errors: unknown[] = [],
        public stack: string = ''
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
export const axiosInstance = axios.create({
    baseURL: envConfig.VITE_APP_API_ORIGIN,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

// Add request interceptor to ensure proper headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Ensure these are set for every request
        config.withCredentials = true;
        config.headers.set('Accept', 'application/json');
        config.headers.set('Content-Type', 'application/json');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let refreshingTokenInProgress = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle canceled requests specially
        if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
            return Promise.reject(new ApiError(499, 'Request canceled'));
        }

        if (error?.config?.url?.includes("refresh-token")) {
            return Promise.reject(error);
        }

        if (
            error?.response?.status === 401 &&
            !error?.config?.url?.includes("login") &&
            !refreshingTokenInProgress
        ) {
            refreshingTokenInProgress = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await userApi.refreshAccessToken(refreshToken);
                refreshingTokenInProgress = false;

                if (!(response instanceof ApiError)) {
                    return axios({
                        ...error.config,
                        withCredentials: true
                    });
                }
            } catch (refreshError) {
                refreshingTokenInProgress = false;
                localStorage.clear()
                window.location.reload()
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;