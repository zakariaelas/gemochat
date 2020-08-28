import React from 'react';
import {
  EventBusy,
  Assignment,
  AssignmentTurnedIn,
} from '@material-ui/icons';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { INTERVIEW_STATUS } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    background: 'hsl(247deg 47% 41%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: '2.5rem',
  },
}));

const InterviewFallback = ({ filter }) => {
  const classes = useStyles();

  let fallbackByFilter;
  switch (filter) {
    case INTERVIEW_STATUS.AWAITING_ASSESSMENT:
      fallbackByFilter = {
        icon: <AssignmentTurnedIn />,
        label: 'No awaiting assessments',
      };
      break;
    case INTERVIEW_STATUS.COMPLETED:
      fallbackByFilter = {
        icon: <Assignment />,
        label: 'Some assessments might be pending...',
      };
      break;
    case INTERVIEW_STATUS.SCHEDULED:
      fallbackByFilter = {
        icon: <EventBusy />,
        label: 'No scheduled interviews',
      };
      break;
    default:
      return <></>;
  }

  return (
    <Box
      minHeight="45vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mb={1.5} className={classes.circle}>
        {React.cloneElement(fallbackByFilter.icon, {
          className: classes.icon,
        })}
      </Box>
      <Typography variant="h6">{fallbackByFilter.label}</Typography>
    </Box>
  );
};

export default InterviewFallback;
