import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useCurrentUserContext from '../../hooks/useCurrentUserContext';

export default function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useCurrentUserContext();
  const renderChildren = currentUser.isAuthenticated;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        renderChildren ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
