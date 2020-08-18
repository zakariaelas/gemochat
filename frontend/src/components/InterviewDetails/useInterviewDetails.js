import { useQuery } from 'react-query';
import api from '../../api';

const useInterviewDetails = (key, config = {}) => {
  const { data, ...options } = useQuery(
    ['interview', { key }],
    api.getInterviewInformation,
    config,
  );

  return [data, { ...options }];
};

export default useInterviewDetails;
