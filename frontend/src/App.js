import React, { Suspense } from 'react';
import LoadingSpinner from './ui/Spinners/LoadingSpinner';
import { useAuth } from './components/AuthProvider/AuthProvider';

const AuthenticatedApp = React.lazy(() =>
  import('./components/AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() =>
  import('./components/UnauthenticatedApp/UnauthenticatedApp'),
);

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </Suspense>
  );
};

export default App;
