import { useMutation } from 'react-query';
import api from '../../api';
import snackbar from '../../ui/Snackbar';
import { useAuth } from '../../components/AuthProvider/AuthProvider';

const useUpdateProfile = () => {
  const { setUser } = useAuth();
  const [mutate, options] = useMutation(api.editProfile, {
    onSuccess: (data) => {
      snackbar.success('Profile updated');
      setUser(data);
    },
  });

  return [mutate, options];
};

export default useUpdateProfile;
