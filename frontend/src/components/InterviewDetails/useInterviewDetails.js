import { useQuery } from 'react-query';
import api from '../../api';

const useInterviewDetails = (key) => {
  const { data, ...options } = useQuery(
    ['interview', { key }],
    api.getInterviewInformation,
    {
      initialData: {
        questions: [],
        scorecard: [],
      },
      initialStale: true,
    },
  );

  return [data, { ...options }];
};

export default useInterviewDetails;
