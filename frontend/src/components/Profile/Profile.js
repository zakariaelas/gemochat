import React from 'react';
import {
  Box,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Roboto',
    fontSize: theme.spacing(2),
    fontWeight: 500,
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent={['stretch', 'center']}>
      <Box flex={[1, 0.45]}>
        <Paper elevation={0}>
          <Box py={[1.5, 3.5]} px={[2, 6]}>
            <Typography className={classes.title} variant="h6">
              Change your profile
            </Typography>
            <Box mt={1.5}>
              <ProfileForm
                initialValues={{
                  displayName: '',
                  email: '',
                  password: '',
                  password: '',
                  newPassword: '',
                  confirmationPassword: '',
                }}
                onSubmit={(values) => console.log(values)}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
