// axiosConfig.js
import axios from 'axios';

let baseUrl

console.log("Environment:", import.meta.env.ENVIRONMENT);

switch (import.meta.env.ENVIRONMENT){
    case "local":
        baseUrl = '/api'
        break;
    case "debug":
        baseUrl = import.meta.env.DEBUG_BASE_URL
        break;
    case "production":
        baseUrl = import.meta.env.PRODUCTION_BASE_URL
        break;
}

console.log("Base URL after switch:", baseUrl);


// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // If you need to send cookies
});

console.log("Axios Base URL:", axiosInstance.defaults.baseURL);


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
