// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://password-lock-backend:8080/', // Replace with your API base URL
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

        if (error.response) {
            if (error.response.status === 401) {
                if (setAuthInfo) {
                    setAuthInfo(prevState => ({
                        ...prevState,
                        authenticated: false,
                        registrationCompleted: false
                    }));
                }
                return Promise.reject(error);
            } else {
                setAuthInfo(prevState => ({
                    ...prevState,
                    authenticated: false,
                    registrationCompleted: false
                }));
                window.location.href = '/error';
            }
        } else {
            setAuthInfo(prevState => ({
                ...prevState,
                authenticated: false,
                registrationCompleted: false
            }));
            window.location.href = '/error';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
