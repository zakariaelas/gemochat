import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from '../../theme';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from '../AuthProvider/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const AppProviders = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReactQueryConfigProvider
        config={{ queries: { refetchOnWindowFocus: false } }}
      >
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ReactQueryConfigProvider>
    </MuiThemeProvider>
  );
};

export default AppProviders;
