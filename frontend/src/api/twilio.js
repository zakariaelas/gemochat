import axiosInstance from './axiosInstance';
import qs from 'qs';

export const getAccessToken = (_, data) => {
  return axiosInstance({
    method: 'GET',
    url: `/twilio/token?${qs.stringify(data)}`,
  }).then((res) => res.data);
};
