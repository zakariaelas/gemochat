import React from 'react';
import { Typography, Box } from '@material-ui/core';
import ButtonPrimary from '../../ui/Buttons/ButtonPrimary';
import { Link } from 'react-router-dom';

const NotValidInterview = ({ meetingId }) => {
  return (
    <Box
      pt={6}
      flexDirection="column"
      display="flex"
      alignItems="center"
    >
      <Typography align="center" variant="h4" paragraph>
        Wrong Meeting Code
      </Typography>
      <Typography align="center" color="textSecondary" gutterBottom>
        <b>{meetingId}</b> is not a valid meeting code.
      </Typography>
      <Typography align="center" color="textSecondary">
        Make sure you copied the correct link shared with you. Contact
        your interviewer if you think the link is correct.
      </Typography>
      <Box pt={2.5}>
        <ButtonPrimary component={Link} to="/">
          Return to home
        </ButtonPrimary>
      </Box>
    </Box>
  );
};

export default NotValidInterview;
