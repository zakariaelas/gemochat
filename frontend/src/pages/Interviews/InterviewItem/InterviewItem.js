import React from 'react';
import {
  Paper,
  Box,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ButtonSecondary from '../../../ui/Buttons/ButtonSecondary';
import ButtonPrimary from '../../../ui/Buttons/ButtonPrimary';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { INTERVIEW_STATUS } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderBottom: `1px solid #D6D2F9`,
    borderRadius: 20,
  },
  chip: {
    textTransform: 'capitalize',
  },
  dateContainer: {
    marginTop: -theme.spacing(3.5),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(3.5),
    borderRadius: 20,
    backgroundColor: '#F1F4F8',
  },
  interviewType: {
    fontWeight: 500,
    fontFamily: 'Roboto',
  },
  gutterBottom: {
    marginBottom: theme.spacing(0.25),
  },
  iconButton: {
    padding: 2,
  },
}));

const PrimaryAction = {
  [INTERVIEW_STATUS.SCHEDULED]: (interview) => (
    <ButtonPrimary component={Link} to={`/${interview.key}`}>
      Start
    </ButtonPrimary>
  ),
  [INTERVIEW_STATUS.AWAITING_ASSESSMENT]: (interview) => (
    <ButtonPrimary
      component={Link}
      to={`/${interview.key}/assessment`}
    >
      Continue
    </ButtonPrimary>
  ),
  [INTERVIEW_STATUS.COMPLETED]: (interview) => (
    <ButtonPrimary
      component={Link}
      to={`/${interview.key}/assessment`}
    >
      View
    </ButtonPrimary>
  ),
};

const InterviewItem = ({ interview }) => {
  const classes = useStyles();
  const date = moment(interview.date);
  return (
    <Paper className={classes.paper} elevation={0}>
      <Box
        display="flex"
        flexDirection="column"
        pt={0.5}
        pb={0.75}
        pl={0.625}
        pr={0.5}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton className={classes.iconButton} size="small">
            <MoreVert className={classes.icon} />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Box
            display="flex"
            flex="0.5"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className={classes.dateContainer}
          >
            <Typography
              variant="h5"
              classes={{
                gutterBottom: classes.gutterBottom,
              }}
              gutterBottom
            >
              {date.format('ddd')}
            </Typography>
            <Typography
              variant="body1"
              classes={{
                gutterBottom: classes.gutterBottom,
              }}
              gutterBottom
            >
              {date.format('DD')}
            </Typography>
            <Typography
              variant="body1"
              classes={{
                gutterBottom: classes.gutterBottom,
              }}
              gutterBottom
            >
              {date.format('MMM YYYY')}
            </Typography>
            <Typography variant="h6" paragraph>
              {date.format('HH:mm')}
            </Typography>
          </Box>
          <Box flex="1">
            <Typography
              variant="h6"
              className={classes.interviewType}
              paragraph
            >
              {interview.job_name}
            </Typography>
            <Typography variant="body1" paragraph>
              {interview.interview_type}
            </Typography>
            <Typography variant="body2" paragraph>
              {interview.candidate_name}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={1.5}>
            <ButtonSecondary
              component={Link}
              to={`/interviews/${interview.key}/details`}
            >
              Details
            </ButtonSecondary>
          </Box>
          {PrimaryAction[interview.status] && (
            <Box mr={1.5}>
              {PrimaryAction[interview.status](interview)}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default InterviewItem;
