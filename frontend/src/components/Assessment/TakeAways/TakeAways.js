import React, { useCallback, useMemo } from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';
import RichTextEditor from '../../../ui/RichTextEditor';
import { useParams } from 'react-router-dom';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 700,
    color: '#102A43',
    marginBottom: theme.spacing(0.5),
  },
  helperText: {
    // marginLeft: theme.spacing(0.25),
    color: theme.palette.blueGrey[500],
  },
}));

const TakeAways = (props) => {
  const classes = useStyles();
  const { meetingId } = useParams();
  const {
    interview: { takeAways },
    updateInterview,
  } = useInterviewStateContext();

  const onChangeTakeAways = useCallback(
    (takeAways) => {
      updateInterview({ takeAways });
    },
    [updateInterview],
  );

  return useMemo(
    () => (
      <>
        <Typography variant="body1" className={classes.label}>
          Key Take-Aways{' '}
          <Typography
            variant="body2"
            className={classes.helperText}
            component="span"
          >
            (conclusions, pros, cons, and things to follow up on)
          </Typography>
        </Typography>
        <Box mb={2}>
          <RichTextEditor
            value={takeAways}
            onChange={onChangeTakeAways}
            hash={`takeAways-${meetingId}`}
          />
        </Box>
      </>
    ),
    [takeAways, onChangeTakeAways, classes, meetingId],
  );
};

export default TakeAways;
