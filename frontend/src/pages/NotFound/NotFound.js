import React from 'react';
import { Typography, Box } from '@material-ui/core';
import ButtonPrimary from '../../ui/Buttons/ButtonPrimary';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box
    pt={6}
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Box mb={3}>
      <Typography color="primary" variant="h1">
        x_x
      </Typography>
    </Box>
    <Typography variant="h3">404 not found...</Typography>
    <Box mt={2}>
      <ButtonPrimary component={Link} to="/">
        Homescreen
      </ButtonPrimary>
    </Box>
  </Box>
);

export default NotFound;
