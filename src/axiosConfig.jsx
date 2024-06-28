// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8085/', // Replace with your API base URL
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

        if (setAuthInfo) {
            setAuthInfo(prevState => ({
                ...prevState,
                authenticated: false,
                registrationCompleted: false
            }));
        }

        window.location.href = '/';

        return Promise.reject(error);
    }
);

export default axiosInstance;
