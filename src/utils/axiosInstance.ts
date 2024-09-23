import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import authSlice from '../redux/slices/authSlice';
import { authservice } from '../api/auth.api';

export interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errors: any[];
    stack: string;
}

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public errors: any[] = [],
        public stack: string = ''
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 }).then(token => {
//                     originalRequest.headers['Authorization'] = 'Bearer ' + token;
//                     return axiosInstance(originalRequest);
//                 }).catch(err => {
//                     return Promise.reject(err);
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             return new Promise((resolve, reject) => {
//                 axiosInstance.post('/user/auth/refresh')
//                     .then(({ data }) => {
//                         const { accessToken } = data.data;
//                         axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
//                         originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
//                         processQueue(null, accessToken);
//                         resolve(axiosInstance(originalRequest));
//                     })
//                     .catch((err) => {
//                         processQueue(err, null);
//                         reject(err);
//                     })
//                     .finally(() => {
//                         isRefreshing = false;
//                     });
//             });
//         }

//         return Promise.reject(error);
//     }
// );

let refreshingTokenInProgress = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

        /* If an error has occurred from refresh token api */
        if (error?.config?.url?.includes("refresh-token")) {
            return Promise.reject(error);
        }
        /*If the response status is 401, and the requested api end point is not login api  */
        if (
            error?.response?.status === 401 &&
            !error?.config?.url?.includes("login") &&
            !refreshingTokenInProgress
        ) {

            /* Refreshing the token */
            refreshingTokenInProgress = true;
            console.log(localStorage.getItem('refreshToken')!)

            const response = await authservice.refreshAccessToken(localStorage.getItem('refreshToken')!);

            refreshingTokenInProgress = false;

            /* Refresh token success */
            if (!(response instanceof ApiError)) {
                /* Replay the original request */
                return axios(error.config);
            }
        }

        /* Other errors */
        return Promise.reject(error);
    }
);




export default axiosInstance;