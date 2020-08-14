import axios from 'axios';
import snackbar from '../ui/Snackbar';

const instance = axios.create({
  baseURL: `${process.env.PUBLIC_URL}/api`,
});

instance.interceptors.request.use((config) => {
  if (localStorage.token)
    config.headers.Authorization = `Bearer ${localStorage.token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      snackbar.error(data.error.message);
      // return data.error;
    } else {
      snackbar.error('Error: Please try again later');
      // return error;
    }
    throw error;
  },
);

export default instance;
