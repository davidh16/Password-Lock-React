// axiosConfig.js
import axios from 'axios';

let baseUrl

console.log(process.env)

console.log(import.meta.env.VITE_ENVIRNONMENT)
console.log(import.meta.env.ENVIRNONMENT)

switch (process.env.ENVIRONMENT){
    case "local":
        baseUrl = '/api'
        break;
    case "debug":
        baseUrl = process.env.DEBUG_BASE_URL
        break;
    case "production":
        baseUrl = process.env.PRODUCTION_BASE_URL
        break;
}

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // If you need to send cookies
});

let setAuthInfo;

export const setAuthInfoUpdater = (updater) => {
    setAuthInfo = updater;
};
// Add a response interceptor
axiosInstance.interceptors.response.use(

    (response) => {
        return response;
    },
    (error) => {
        localStorage.removeItem('authInfo');
        setAuthInfo(prevState => ({
            ...prevState,
            authenticated: false,
            registrationCompleted: false
        }));

        if (error.response) {
            if (error.response.status === 401) {
                return Promise.reject(error);
            } else {
                 window.location.href = '/error';
            }
        } else {
            window.location.href = '/error';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
