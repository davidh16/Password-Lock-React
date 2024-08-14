// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true, // Include cookies in requests
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
