import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Interview from '../../pages/Interview/Interview';
import NotFound from '../../pages/NotFound/NotFound';

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={['/', '/login']}>
        <Login />
      </Route>
      <Route exact path="/:meetingId">
        <Interview />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default UnauthenticatedApp;
