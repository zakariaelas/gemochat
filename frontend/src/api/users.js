import axiosInstance from './axiosInstance';

export const editProfile = (data) => {
  return axiosInstance({
    method: 'PUT',
    url: `/users/`,
    data,
  }).then((res) => res.data);
};
