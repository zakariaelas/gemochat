import { useContext } from 'react';
import { CurrentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider';

const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      'useCurrentUserContext must be used within a CurrentUserContext',
    );
  }
  return context;
};

export default useCurrentUserContext;
