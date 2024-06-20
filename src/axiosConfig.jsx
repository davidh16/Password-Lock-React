// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: '<http://localhost:8085', // Replace with your API base URL
    withCredentials: true, // Include cookies in requests
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return the response
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // If the response status is 401, redirect to the login page
            window.location.href = '/login';
        }
        // Return the error to be handled by the requesting code
        return Promise.reject(error);
    }
);

export default axiosInstance;
