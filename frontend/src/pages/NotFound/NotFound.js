import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
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
      <Button color="primary" component={Link} to="/">
        Homescreen
      </Button>
    </Box>
  </Box>
);

export default NotFound;
