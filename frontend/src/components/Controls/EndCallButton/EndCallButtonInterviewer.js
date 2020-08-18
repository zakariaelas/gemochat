import React from 'react';
import useVideoContext from '../../../hooks/useVideoContext';
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { CallEnd } from '@material-ui/icons';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import { INTERVIEW_STEP } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  endCallButton: {
    backgroundColor: 'hsl(354, 85%, 44%)',
    '&:hover': {
      backgroundColor: 'hsl(356, 75%, 53%)',
    },
  },
}));

const EndCallButtonInterviewer = (props) => {
  const { room } = useVideoContext();
  const classes = useStyles();
  const { updateInterviewStep } = useInterviewStateContext();

  return (
    <Tooltip title="End Call" placement="top">
      <IconButton
        className={classes.endCallButton}
        color="inherit"
        onClick={() => {
          room.disconnect();
          updateInterviewStep(INTERVIEW_STEP.ASSESSMENT);
        }}
      >
        <CallEnd />
      </IconButton>
    </Tooltip>
  );
};

export default EndCallButtonInterviewer;
