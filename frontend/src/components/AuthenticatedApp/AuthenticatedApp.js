import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Interviews from '../../pages/Interviews/Interviews';
import Profile from '../../pages/Profile/Profile';
import InterviewDetails from '../../pages/InterviewDetails/InterviewDetails';
import AppLayout from '../../ui/AppLayout';
import NotFound from '../../pages/NotFound/NotFound';
import Interview from '../../pages/Interview/Interview';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorDialogFallback from '../ErrorDialogFallback/ErrorDialogFallback';
import AssessmentPage from '../../pages/AssessmentPage/AssessmentPage';

const AuthenticatedApp = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorDialogFallback}>
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
          path={[
            '/',
            '/profile',
            '/interviews/:key/details',
            '/:key/assessment',
          ]}
        >
          <AppLayout>
            <Route label="Interviews" exact path="/" isTab>
              <Interviews label="Interviews" exact path="/" isTab />
            </Route>
            <Route label="Profile" exact path="/profile" isTab>
              <Profile />
            </Route>
            <Route
              exact
              isTab={false}
              path="/interviews/:key/details"
            >
              <InterviewDetails />
            </Route>
            <Route exact isTab={false} path="/:key/assessment">
              <AssessmentPage />
            </Route>
          </AppLayout>
        </Route>
        <Route exact path="/:key">
          <Interview />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
};

export default AuthenticatedApp;
