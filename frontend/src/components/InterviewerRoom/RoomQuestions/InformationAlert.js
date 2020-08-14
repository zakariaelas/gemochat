import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Info, Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  infoIcon: {
    color: '#D9E2EC',
  },
}));

const InformationAlert = (props) => {
  const classes = useStyles();
  const [infoVisible, setInfoVisible] = useState(true);
  const handleClose = () => {
    setInfoVisible(false);
  };

  if (!infoVisible) return null;

  return (
    <Box
      borderLeft="3px solid #D9E2EC"
      pl={0.5}
      mt={0.5}
      mb={0.5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Info fontSize="small" className={classes.infoIcon} />
        <Box ml={0.5}>
          <Typography variant="body2" color="textSecondary">
            You can use the arrow keys on your keyboard to navigate
            the questions
          </Typography>
        </Box>
      </Box>
      <IconButton size="small" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default InformationAlert;
