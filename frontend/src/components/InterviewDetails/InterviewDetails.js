import React from 'react';
import {
  Box,
  Paper,
  Typography,
  ListItemText,
  List,
  ListItem,
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {
  Link,
  Assessment,
  Work,
  CalendarToday,
  Person,
} from '@material-ui/icons';

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
}));

const InterviewDetails = () => {
  const classes = useStyles();
  return (
    <Box>
      <Paper elevation={0}>
        <Box px={[1.25, 2.5]} pt={0.625} pb={1}>
          <Typography variant="h5" paragraph>
            Interview Details
          </Typography>
          <Box mb={1.5} display="flex" alignItems="center">
            <Tooltip title="Copy Link">
              <IconButton
                className={classes.iconButton}
                size="small"
                disableRipple
                color="secondary"
              >
                <Link />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" color="textSecondary">
              https://www.gemochat.com/lhrs-wwdw-dbjsdbs-dskjd
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Assessment />
                <Box ml={0.625}>
                  <Typography>Technical Interview</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Work />
                <Box ml={0.625}>
                  <Typography>Full Stack Engineer</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <CalendarToday />
                <Box ml={0.625}>
                  <Typography>
                    Tuesday 10 July 2020 11:00 am
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box mb={1} display="flex" alignItems="center">
                <Person />
                <Box ml={0.625}>
                  <Typography>Keanu Reeves</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt={1.25} mb={2}>
            <Typography variant="h6" paragraph>
              Interview Questions
            </Typography>
            <List className={classes.listQuestions}>
              <ListItem className={classes.listItemQuestions}>
                <Box mr={1} className={classes.circle}>
                  1
                </Box>
                <ListItemText primary="What is the Virtual DOM?" />
              </ListItem>
            </List>
          </Box>
          <Box>
            <Typography variant="h6" paragraph>
              Scorecard
            </Typography>
            <Box>
              <Typography className={classes.attributeType} paragraph>
                Software Engineering
              </Typography>
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Build Automation" />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Version Control" />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Code Organization" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InterviewDetails;
