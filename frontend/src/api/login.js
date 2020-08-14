import axiosInstance from './axiosInstance';

export const login = (data) => {
  return axiosInstance({
    method: 'POST',
    url: '/auth/login',
    data,
  }).then((res) => res.data);
};
