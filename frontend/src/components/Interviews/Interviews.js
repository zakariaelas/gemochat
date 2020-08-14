import React, { useEffect } from 'react';
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
} from '@material-ui/core';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import {
  Person,
  CalendarToday,
  ArrowForward,
  ArrowForwardIos,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.blueGrey[200]}`,
  },
  chip: {
    textTransform: 'capitalize',
  },
}));

const Interviews = (props) => {
  const classes = useStyles();

  const { data, isLoading, refetch } = useQuery(
    'interviews',
    api.getInterviews,
    {
      initialData: {
        interviews: [],
      },
    },
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h5" paragraph>
            Interviews
          </Typography>
          <Grid container spacing={2}>
            {data.interviews.map((interview) => (
              <Grid key={interview.id} item lg={4}>
                <Paper className={classes.paper} elevation={0}>
                  <Box pt={1} px={1.5}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6" paragraph>
                        Technical Interview
                      </Typography>
                      <Chip
                        className={classes.chip}
                        label={interview.status}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </Box>
                    <Box mb={1}>
                      <Divider />
                    </Box>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <CalendarToday fontSize="small" />
                      <Box ml={0.5}>
                        <Typography>July 27th at 3:00pm</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Person fontSize="small" />
                      <Box ml={0.5}>
                        <Typography>Imad Masbahi</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box p={1} display="flex" justifyContent="flex-end">
                    <Button component={Link} to={`/${interview.key}`}>
                      <ArrowForwardIos fontSize="small" />
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

Interviews.propTypes = {};

export default Interviews;
