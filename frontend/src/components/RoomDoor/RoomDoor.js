import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalVideoPreview from '../LocalVideoPreview/LocalVideoPreview';
import useDialog from '../../hooks/useDialog';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    borderRadius: 10,
    background: '#000',
    boxShadow:
      '0 1px 3px hsla(0,0%, 0%, .12), 0 1px 2px hsla(0, 0%, 0%, 0.24)',
  },
}));

const RoomDoor = ({ joinMeeting, displayName, setDisplayName }) => {
  const classes = useStyles();
  const [open, { handleClose, handleOpen }] = useDialog(false);
  return (
    <>
      <Box p={3} display="flex" alignItems="center">
        <Box
          mx={2}
          minWidth="760px"
          minHeight="427px"
          display="flex"
          position="relative"
          flexDirection="column"
          justifyContent="center"
          color="#fff"
          className={classes.videoContainer}
        >
          <LocalVideoPreview />
        </Box>
        <Box
          flexBasis="75%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h4" paragraph>
            Ready to start?
          </Typography>
          <Typography variant="body1">
            Make sure everything is set before joining your interview
            and <b>good luck !</b>
          </Typography>
          <Box mt={2}>
            <Button
              onClick={handleOpen}
              variant="contained"
              color="primary"
            >
              Join now
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Choose your display name</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            value={displayName}
            placeholder="John Doe"
            name="displayName"
            label="Display name"
            margin="dense"
            fullWidth
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={joinMeeting} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomDoor;
