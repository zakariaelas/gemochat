import React from 'react';
import {
  Box,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';
import { useParams } from 'react-router-dom';
import RichTextEditor from '../../ui/RichTextEditor';
import { useFormikContext } from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
  },
  title: {
    color: '#829AB1',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    fontSize: '1.1rem',
  },
}));

const MeetingNotes = (props) => {
  const classes = useStyles();
  const { meetingId } = useParams();
  return (
    <Paper className={classes.paper} elevation={0}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        py={1}
        pl={3}
        pr={1}
      >
        <Typography className={classes.title} variant="h6" paragraph>
          Meeting Notes
        </Typography>
        <Typography paragraph variant="body2" color="textSecondary">
          Use this space to take notes during the interview. All
          changes are saved automatically.
        </Typography>
        <Box flex="1" pb={2}>
          <RichTextEditor name="notes" hash={`notes-${meetingId}`} />
        </Box>
      </Box>
    </Paper>
  );
};

export default MeetingNotes;
