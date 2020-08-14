import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import GemochatIcon from '../assets/gemo-dark-blue.png';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '100%',
    width: '100%',
  },
}));

const RoomDoorLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box pt={[4, 5]} pb={2}>
      <Container maxWidth="xl">
        <Box width={[200, 220]} mx="auto" mb={2}>
          <img
            className={classes.img}
            alt="logo"
            src={GemochatIcon}
          />
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default RoomDoorLayout;
