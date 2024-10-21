import axios from 'axios';
import { ACCESS_TOKEN_LOCAL_STORAGE, REFRESH_TOKEN_LOCAL_STORAGE } from '../constants/auth';
import { PUBLIC_ENDPOINTS, REFRESH_TOKEN_ENDPOINT } from '../constants/endpoints';

let isRefreshing = false;
let failedQueue = [];

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const processQueue = (token = null) => {
  failedQueue.forEach(({ resolve, reject, originalError }) => {
    if (!token) {
      reject(originalError);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Authorization token injection
axiosInstance.interceptors.request.use(
  (config) => {
    // Check is url should be excluded from the Bearer insertion
    if (PUBLIC_ENDPOINTS.includes(config.url)) {
      return config;
    }
    const tcsAccessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
    if (tcsAccessToken) {
      config.headers.Authorization = `Bearer ${tcsAccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Authorization token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // While refreshing queue any unauthorized error responses will be added to a queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalError: error });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tcsRefreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE);
        const tcsAccessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);

        if (!tcsRefreshToken || !tcsAccessToken) {
          return Promise.reject(error);
        }

        localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE);
        localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}${REFRESH_TOKEN_ENDPOINT}`, {
          accessToken: tcsAccessToken,
          refreshToken: tcsRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, accessToken);
        localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // After a successful refresh flow, the error responses queue is processed
        processQueue(accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
