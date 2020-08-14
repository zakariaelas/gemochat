import { useQuery } from 'react-query';
import api from '../api';

const useInterview = (key, config = {}) => {
  const { data, ...options } = useQuery(
    ['interview', { key }],
    api.getInterviewNormalized,
    config,
  );

  return [data, { ...options }];
};

export default useInterview;
