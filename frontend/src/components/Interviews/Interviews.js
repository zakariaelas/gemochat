import React, { useEffect, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../api';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions,
  Paper,
  Divider,
  makeStyles,
  Chip,
  IconButton,
} from '@material-ui/core';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import {
  Person,
  CalendarToday,
  ArrowForward,
  ArrowForwardIos,
  MoreVert,
} from '@material-ui/icons';
import LoadingContainer from '../../ui/Spinners/LoadingContainer';
import InterviewsFilter from './InterviewsFilter';
import { INTERVIEW_STATUS } from '../../constants';
import ButtonSecondary from '../../ui/Buttons/ButtonSecondary';
import ButtonPrimary from '../../ui/Buttons/ButtonPrimary';

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

const Interviews = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = useState(INTERVIEW_STATUS.SCHEDULED);

  const setInterviewFilter = useCallback((filter) => {
    setFilter(filter);
  });

  const { data, isLoading } = useQuery(
    'interviews',
    api.getInterviews,
    {
      initialStale: true,
      initialData: {
        interviews: [],
      },
    },
  );

  return (
    <LoadingContainer isLoading={isLoading} color="primary">
      <Box mb={3}>
        <InterviewsFilter setFilter={setInterviewFilter} />
      </Box>
      <Grid container spacing={3}>
        {data.interviews.map((interview) => (
          <Grid key={interview.id} item lg={4} sm={6} xs={12}>
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
                  <IconButton
                    className={classes.iconButton}
                    size="small"
                  >
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
                      Tue
                    </Typography>
                    <Typography
                      variant="body1"
                      classes={{
                        gutterBottom: classes.gutterBottom,
                      }}
                      gutterBottom
                    >
                      10
                    </Typography>
                    <Typography
                      variant="body1"
                      classes={{
                        gutterBottom: classes.gutterBottom,
                      }}
                      gutterBottom
                    >
                      July 2020
                    </Typography>
                    <Typography variant="h6" paragraph>
                      11:00
                    </Typography>
                  </Box>
                  <Box flex="1">
                    <Typography
                      variant="h6"
                      className={classes.interviewType}
                      paragraph
                    >
                      Full Stack Engineer
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Technical Interview
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Keanu Reeves
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Box mr={1.5}>
                    <ButtonSecondary>Details</ButtonSecondary>
                  </Box>
                  <Box mr={1.5}>
                    <ButtonPrimary>Start</ButtonPrimary>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </LoadingContainer>
  );
};

Interviews.propTypes = {};

export default Interviews;
