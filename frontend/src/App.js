import React, { Suspense } from 'react';
import { useAuth } from './components/AuthProvider/AuthProvider';
import FullPageSpinner from './ui/Spinners/FullPageSpinner';

const AuthenticatedApp = React.lazy(() =>
  import('./components/AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() =>
  import('./components/UnauthenticatedApp/UnauthenticatedApp'),
);

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Suspense
      fallback={
        <FullPageSpinner size={36} thickness={4} disableShrink />
      }
    >
      {isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </Suspense>
  );
};

export default App;
