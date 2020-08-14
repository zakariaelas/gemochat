import useCurrentUserContext from './useCurrentUserContext';
import { useMutation } from 'react-query';
import api from '../api';
import { useHistory, useLocation } from 'react-router-dom';

const useLoginMutation = () => {
  const { authUser } = useCurrentUserContext();
  const history = useHistory();
  const location = useLocation();
  const [mutate, options] = useMutation(api.login, {
    onSuccess: (data) => {
      authUser(data);
      history.push(location.state.from || { pathname: '/' });
    },
  });

  return [mutate, options];
};

export default useLoginMutation;
