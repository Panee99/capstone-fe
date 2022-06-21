import jwtDecode from 'jwt-decode';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// const handleTokenExpired = (exp: number) => {
//   let expiredTimer;

//   const currentTime = Date.now();

//   // Test token expires after 10s
//   // const timeLeft = currentTime + 10000 - currentTime; // ~10s
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     console.log('Token expired');
//     // localStorage.removeItem('accessToken');
//   }, timeLeft);
// };

const isExpiredToken = (accessToken: string) => {
  const { exp } = jwtDecode<{ exp: number }>(accessToken);
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
};

const refreshToken = async (token: string) => {
  localStorage.removeItem('accessToken');
  const userId = localStorage.getItem('userId');
  const response = await axios.post('/auth/getaccesstoken', { userId, refreshToken: token });
  const { accessToken } = response.data;
  setSession(accessToken);
  return accessToken;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode<{ exp: number }>(accessToken); // ~5 days by minimals server
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, refreshToken, isExpiredToken };
