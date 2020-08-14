import React, { useState } from 'react';
import {
  Tooltip,
  Button,
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { Videocam } from '@material-ui/icons';
import FixedFab from '../../ui/FixedFab';
import NewInterview from '../NewInterview/NewInterview';
import { Link } from 'react-router-dom';
import Interviews from '../Interviews/Interviews';

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Box flexGrow="1">
            <Typography variant="h6">Gemochat</Typography>
          </Box>
          <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box pt={2}>
        <Container maxWidth="xl">
          <Interviews />
          <NewInterview open={open} handleClose={handleClose} />
          <Tooltip title="New interview" placement="left">
            <FixedFab onClick={handleOpen} color="primary">
              <Videocam />
            </FixedFab>
          </Tooltip>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
