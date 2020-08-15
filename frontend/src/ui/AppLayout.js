import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  makeStyles,
  Container,
} from '@material-ui/core';
import { ReactComponent as GemoLogo } from '../assets/gemo_logo.svg';
import { Link, Switch } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
import NavTabs from './Navigation/NavTabs';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#43379A',
  },
  toolbar: {
    alignItems: 'stretch',
    minHeight: '72px',
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar
        className={classes.appbar}
        elevation={0}
        position="static"
      >
        <Toolbar className={classes.toolbar}>
          <Box display="flex" alignItems="center">
            <GemoLogo />
          </Box>
          <NavTabs>{children}</NavTabs>
          <Box
            display="flex"
            alignItems="center"
            color="inherit"
            component={Link}
            to="/logout"
          >
            <ExitToApp />
          </Box>
        </Toolbar>
      </AppBar>
      <Box py={2}>
        <Container maxWidth="xl">
          <Switch>{children}</Switch>
        </Container>
      </Box>
    </>
  );
};

export default AppLayout;
