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
import Home from './components/Home/Home';

const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/logout"
            render={() => {
              localStorage.removeItem('token');
              window.location.href = `${process.env.PUBLIC_URL}/`;
            }}
          />
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
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
