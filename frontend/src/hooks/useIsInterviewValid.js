import { useQuery } from 'react-query';
import api from '../api';

const useIsInterviewValid = (key) => {
  const { data, ...options } = useQuery(
    ['valid', { key }],
    api.isInterviewValid,
    {
      initialData: {},
      initialStale: true,
    },
  );

  return [data.valid, { data, ...options }];
};

export default useIsInterviewValid;
