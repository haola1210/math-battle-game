/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';

const apiUrl =
  import.meta.env.VITE_APP_MODE === 'dev'
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL;

export const publicInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const privateInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

privateInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async (error) => Promise.reject(error),
);

privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    if (error.response.status === 401) {
      const { data } = await privateInstance.get('/auth/refresh-token');
      localStorage.setItem('access_token', data.accessToken);
      return privateInstance(originalReq);
    }

    return Promise.reject(error);
  },
);
