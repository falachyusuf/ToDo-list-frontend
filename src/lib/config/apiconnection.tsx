// src/utils/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance
const apiConnection = axios.create({
  baseURL: 'http://localhost:2002/api/v1/activity',
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiConnection.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiConnection.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access, e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiConnection;
