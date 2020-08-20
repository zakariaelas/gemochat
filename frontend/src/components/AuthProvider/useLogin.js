import { useMutation } from 'react-query';
import api from '../../api';

const useLogin = () => {
  const [mutate, options] = useMutation(api.login);

  return [mutate, options];
};

export default useLogin;
