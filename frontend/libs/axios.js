import axios from 'axios';
import { ACCESS_TOKEN_LOCAL_STORAGE } from '../constants/auth';
import { PUBLIC_ENDPOINTS } from '../constants/endpoints';


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authorization token injection
axiosInstance.interceptors.request.use(
  (config) => {
    // Check is url should be excluded from the Bearer insertion
    if (PUBLIC_ENDPOINTS.includes(config.url)) {
      return config;
    }
    const AccessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
    if (AccessToken) {
      config.headers.Authorization = `Bearer ${AccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);



export default axiosInstance;
