import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import App from './App';
import theme from './theme';
import { ReactQueryConfigProvider } from 'react-query';
import './index.css';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <App />
    </ReactQueryConfigProvider>
  </MuiThemeProvider>,
  rootEl,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
