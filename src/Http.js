import axios from 'axios';
import { logout } from './components/Helper/LogooutHelper';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accesstoken');
  config.headers.Authorization = token;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.warn({ response });
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status == 401) {
      console.info('logout called');
      logout();
      console.info('logout called2');
    }
    return Promise.reject(error);
  }
);

export default axios;