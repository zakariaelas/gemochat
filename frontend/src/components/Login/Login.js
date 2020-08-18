import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import LoginForm from './LoginForm';
import GemochatIcon from '../../assets/gemo-dark-blue.png';
import { useMutation } from 'react-query';
import api from '../../api';
import useLoginMutation from '../../hooks/useLoginMutation';
import useCurrentUserContext from '../../hooks/useCurrentUserContext';
import { useHistory, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '100%',
    width: '100%',
  },
  paper: {
    borderRadius: '8px',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useCurrentUserContext();
  const [login, { isLoading }] = useLoginMutation();
  if (currentUser.isAuthenticated) return <Redirect to="/" />;
  return (
    <Box pt={[4, 5]} pb={2}>
      <Container maxWidth="sm">
        <Box width={[200, 220]} mx="auto" mb={4}>
          <img
            className={classes.img}
            alt="logo"
            src={GemochatIcon}
          />
        </Box>
        <Box mx="auto" maxWidth={['100%', 450]}>
          <Paper className={classes.paper} elevation={1}>
            <Box px={[2, 3]} pt={3} pb={4}>
              <Box mb={2.5}>
                <Typography align="center" variant="h5">
                  Login
                </Typography>
              </Box>
              <LoginForm
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                  await login(values);
                }}
                isLoading={isLoading}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
