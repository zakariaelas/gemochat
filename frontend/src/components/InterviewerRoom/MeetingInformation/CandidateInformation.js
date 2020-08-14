import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const CandidateInformation = (props) => {
  return (
    <Box pt={2}>
      <Typography variant="h5" paragraph>
        Imad Masbahi
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Phone Number
      </Typography>
      <Typography variant="body1" paragraph>
        0662887667
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email
      </Typography>
      <Typography variant="body1" paragraph>
        zakaria.elas@gmail.com
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Github
      </Typography>
      <Typography variant="body1" paragraph>
        https://github.com/zakariaelas
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Current Company
      </Typography>
      <Typography variant="body1" paragraph>
        Gemography
      </Typography>
    </Box>
  );
};

CandidateInformation.propTypes = {};

export default CandidateInformation;
