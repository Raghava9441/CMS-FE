import axios from 'axios';
import { userApi } from '@api/api';

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
    baseURL: import.meta.env.VITE_APP_API_ORIGIN_PROD as string,
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
        config.headers = {
            ...config.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
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