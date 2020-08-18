import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { CurrentUserProvider } from './components/CurrentUserProvider/CurrentUserProvider';
import PrivateRoute from './ui/PrivateRoute';
import Login from './components/Login/Login';
import { VideoProvider } from './components/VideoProvider';
import Interview from './components/Interview/Interview';
import Profile from './components/Profile/Profile';
import Interviews from './components/Interviews/Interviews';
import AppLayout from './ui/AppLayout';
import InterviewDetails from './components/InterviewDetails/InterviewDetails';

const App = () => {
  return (
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
                room.localParticipant.tracks.forEach(({ track }) => {
                  track.stop();
                  track.detach();
                });
              }}
            >
              <Interview />
            </VideoProvider>
          </Route>
        </Switch>
      </Router>
    </CurrentUserProvider>
  );
};

export default App;
