import React from 'react';
import {
  Box,
  Paper,
  Typography,
  ListItemText,
  List,
  Link,
  ListItem,
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {
  Assessment,
  Work,
  CalendarToday,
  Person,
  FileCopy,
} from '@material-ui/icons';
import LoadingContainer from '../../ui/Spinners/LoadingContainer';
import useInterviewDetails from './useInterviewDetails';
import moment from 'moment';
import _ from 'lodash';
import {
  useParams,
  Link as RouterLink,
  useRouteMatch,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: '50%',
    backgroundColor: '#D6D2F9',
    width: 24,
    height: 24,
    lineHeight: '24px',
    textAlign: 'center',
    fontSize: theme.spacing(0.875),
  },
  iconButton: {
    color: '#000',
    backgroundColor: '#D6D2F9',
    boxShadow: '0 3px 6px rgba(0,0,0,.15)',
    marginRight: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: '#C6C0F7',
    },
  },
  attributeType: {
    fontWeight: 500,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItem: {
    '&::after': {
      content: '""',
      width: '24%',
      height: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.blueGrey[100],
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  },
  listQuestions: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemQuestions: {
    paddingLeft: 0,
  },
  link: {
    fontWeight: 500,
  },
}));

const InterviewDetails = () => {
  const classes = useStyles();
  const { key } = useParams();
  const { path } = useRouteMatch();
  let [interview, { isFetching }] = useInterviewDetails(key);

  const attributeType = _.groupBy(interview.scorecard, 'type');

  return (
    <LoadingContainer isLoading={isFetching}>
      <Paper elevation={0}>
        <Box px={[1.25, 2.5]} pt={0.625} pb={1}>
          <Typography variant="h5" paragraph>
            Interview Details
          </Typography>
          <Box mb={1.5} display="flex" alignItems="center">
            <Typography variant="body1" color="textSecondary">
              <Link
                color="inherit"
                component={RouterLink}
                className={classes.link}
                to={`/${interview.key}`}
              >
                {`${window.location.protocol}//${window.location.host}/${interview.key}`}
              </Link>
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Assessment />
                <Box ml={0.625}>
                  <Typography>{interview.interview_type}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Work />
                <Box ml={0.625}>
                  <Typography>{interview.job_name}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <CalendarToday />
                <Box ml={0.625}>
                  <Typography>
                    {moment(interview.date).format(
                      'dddd DD MMMM YYYY',
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Person />
                <Box ml={0.625}>
                  <Typography>{interview.candidate_name}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt={1.25} mb={2}>
            <Typography variant="h6" paragraph>
              Interview Questions
            </Typography>
            <List className={classes.listQuestions}>
              {interview.questions.map((question, index) => (
                <ListItem
                  key={question.id}
                  className={classes.listItemQuestions}
                >
                  <Box mr={1} className={classes.circle}>
                    {index + 1}
                  </Box>
                  <ListItemText primary={question.text} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography variant="h6" paragraph>
              Scorecard
            </Typography>
            <Box>
              {Object.keys(attributeType).map((key) => (
                <Box mb={2.25} key={key}>
                  <Typography
                    className={classes.attributeType}
                    paragraph
                  >
                    {key}
                  </Typography>
                  <List className={classes.list}>
                    {attributeType[key].map((attribute) => (
                      <ListItem
                        key={attribute.id}
                        className={classes.listItem}
                      >
                        <ListItemText primary={attribute.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </LoadingContainer>
  );
};

export default InterviewDetails;
