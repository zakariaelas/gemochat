import { useQuery } from 'react-query';
import api from '../../api';

const useInterviews = () => {
  const { data, ...options } = useQuery(
    'interviews',
    api.getInterviews,
    {
      initialStale: true,
      initialData: {
        interviews: [],
      },
    },
  );
  return [data.interviews, options];
};

export default useInterviews;
