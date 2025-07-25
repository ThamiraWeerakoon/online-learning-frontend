import axios from 'axios';

// Axios instance configured with base URL and token from localStorage
//const api = axios.create({
//    baseURL: 'http://localhost:5050/api',
//    withCredentials: true, // Send cookies/token across origin
//});

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;