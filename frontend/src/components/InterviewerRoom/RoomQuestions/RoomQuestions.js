import React, { useMemo } from 'react';
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  Tooltip,
  Grid,
} from '@material-ui/core';
import QuestionsStepper from './QuestionsStepper';
import { InfoOutlined } from '@material-ui/icons';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import { INTERVIEW_STEP } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.blueGrey[100],
  },
  title: {
    color: theme.palette.blueGrey[400],
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    fontSize: '1.1rem',
  },
  icon: {
    color: theme.palette.blueGrey[400],
  },
  tooltip: {
    fontSize: theme.spacing(0.8),
  },
}));

const RoomQuestions = () => {
  const classes = useStyles();
  const { interviewStep } = useInterviewStateContext();
  return useMemo(() => {
    if (interviewStep === INTERVIEW_STEP.ASSESSMENT) return null;
    return (
      <Grid item lg={12}>
        <Paper elevation={0}>
          <Box px={1} py={0.5}>
            <Box display="flex" alignItems="center">
              <Box mr={0.75}>
                <Typography className={classes.title} variant="h6">
                  Interview Questions
                </Typography>
              </Box>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                interactive
                leaveDelay={500}
                placement="right"
                title="You can use the arrow keys on your keyboard to navigate the questions"
              >
                <InfoOutlined className={classes.icon} />
              </Tooltip>
            </Box>
            <QuestionsStepper />
          </Box>
        </Paper>
      </Grid>
    );
  }, [interviewStep, classes]);
};

export default RoomQuestions;
