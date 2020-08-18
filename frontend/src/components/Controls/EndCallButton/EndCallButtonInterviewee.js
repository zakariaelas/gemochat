import React from 'react';
import useVideoContext from '../../../hooks/useVideoContext';
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { CallEnd } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  endCallButton: {
    backgroundColor: 'hsl(354, 85%, 44%)',
    '&:hover': {
      backgroundColor: 'hsl(356, 75%, 53%)',
    },
  },
}));

const EndCallButtonInterviewee = (props) => {
  const { room } = useVideoContext();
  const classes = useStyles();

  return (
    <Tooltip title="End Call" placement="top">
      <IconButton
        className={classes.endCallButton}
        color="inherit"
        onClick={() => {
          room.disconnect();
        }}
      >
        <CallEnd />
      </IconButton>
    </Tooltip>
  );
};

export default EndCallButtonInterviewee;
