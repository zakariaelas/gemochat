import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Interviews from '../../pages/Interviews/Interviews';
import Profile from '../../pages/Profile/Profile';
import InterviewDetails from '../../pages/InterviewDetails/InterviewDetails';
import AppLayout from '../../ui/AppLayout';
import NotFound from '../../pages/NotFound/NotFound';
import Interview from '../../pages/Interview/Interview';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route
        exact
        path="/logout"
        render={() => {
          localStorage.removeItem('token');
          window.location.href = `${process.env.PUBLIC_URL}/`;
        }}
      />
      <Route
        exact
        path={['/', '/profile', '/interviews/:key/details']}
      >
        <AppLayout>
          <Route label="Interviews" exact path="/" isTab>
            <Interviews label="Interviews" exact path="/" isTab />
          </Route>
          <Route label="Profile" exact path="/profile" isTab>
            <Profile />
          </Route>
          <Route
            label="Profile"
            exact
            isTab={false}
            path="/interviews/:key/details"
          >
            <InterviewDetails />
          </Route>
        </AppLayout>
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

export default AuthenticatedApp;
