import axios from 'axios';

export const configureAxios = () => {
  axios.defaults.baseURL = 'http://localhost:4000/api';
  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};
