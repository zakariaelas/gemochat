import React, { Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { CurrentUserProvider } from './components/CurrentUserProvider/CurrentUserProvider';
import { VideoProvider } from './components/VideoProvider';
import LoadingSpinner from './ui/Spinners/LoadingSpinner';

const Login = React.lazy(() => import('./components/Login/Login'));
const Profile = React.lazy(() =>
  import('./components/Profile/Profile'),
);
const Interviews = React.lazy(() =>
  import('./components/Interviews/Interviews'),
);
const PrivateRoute = React.lazy(() =>
  import('./components/PrivateRoute/PrivateRoute'),
);
const Interview = React.lazy(() =>
  import('./components/Interview/Interview'),
);
const AppLayout = React.lazy(() => import('./ui/AppLayout'));
const InterviewDetails = React.lazy(() =>
  import('./components/InterviewDetails/InterviewDetails'),
);

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CurrentUserProvider>
        <Router>
          <Switch>
            <Route
              exact
              path={['/', '/profile', '/interviews/:key/details']}
            >
              <AppLayout>
                <PrivateRoute label="Interviews" exact path="/" isTab>
                  <Interviews />
                </PrivateRoute>
                <PrivateRoute
                  label="Profile"
                  exact
                  path="/profile"
                  isTab
                >
                  <Profile />
                </PrivateRoute>
                <PrivateRoute
                  label="Profile"
                  exact
                  isTab={false}
                  path="/interviews/:key/details"
                >
                  <InterviewDetails />
                </PrivateRoute>
              </AppLayout>
            </Route>
            <Route
              exact
              path="/logout"
              render={() => {
                localStorage.removeItem('token');
                window.location.href = `${process.env.PUBLIC_URL}/`;
              }}
            />

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/:meetingId">
              <VideoProvider
                onDisconnect={(room) => {
                  room.localParticipant.tracks.forEach(
                    ({ track }) => {
                      track.stop();
                      track.detach();
                    },
                  );
                }}
              >
                <Interview />
              </VideoProvider>
            </Route>
          </Switch>
        </Router>
      </CurrentUserProvider>
    </Suspense>
  );
};

export default App;
