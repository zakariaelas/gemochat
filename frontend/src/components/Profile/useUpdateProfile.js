import { useMutation } from 'react-query';
import api from '../../api';
import useCurrentUserContext from '../../hooks/useCurrentUserContext';
import snackbar from '../../ui/Snackbar';

const useUpdateProfile = () => {
  const { authUser } = useCurrentUserContext();
  const [mutate, options] = useMutation(api.editProfile, {
    onSuccess: (data) => {
      snackbar.success('Profile updated');
      authUser(data);
    },
  });

  return [mutate, options];
};

export default useUpdateProfile;
