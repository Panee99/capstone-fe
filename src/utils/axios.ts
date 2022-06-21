import axios from 'axios';
// config
import { HOST_API } from '../config';
// path
import { PATH_AUTH } from '../routes/paths';
// jwt
import { refreshToken as renew, isExpiredToken } from './jwt';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && isExpiredToken(accessToken) && refreshToken) {
      const accessToken = await renew(refreshToken);
      config!.headers!.Authorization = accessToken;
    }
  } catch (error) {
    window.location.href = PATH_AUTH.login;
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
  } finally {
    return config;
  }
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
