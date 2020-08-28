import React, { useState } from 'react';
import {
  Paper,
  Tabs,
  Box,
  Tab,
  Typography,
  makeStyles,
} from '@material-ui/core';
import TabPanel from '../../../ui/TabPanel';
import JobDetail from './JobDetail';
import CandidateInformation from './CandidateInformation';
import {
  HelpOutline,
  PersonOutline,
  WorkOutline,
} from '@material-ui/icons';
import QuestionListConnected from '../QuestionsList/QuestionListConnected';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'sticky',
    top: theme.spacing(0.5),
    border: '1px solid #D6D2F9',
  },
  title: {
    color: '#829AB1',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    fontSize: '1.1rem',
  },
}));

const MeetingInformation = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_, value) => {
    setValue(value);
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        py={1}
        pl={1.5}
        pr={1}
      >
        <Typography className={classes.title} variant="h6" paragraph>
          Information
        </Typography>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<HelpOutline />} label="Questions" />
          <Tab icon={<PersonOutline />} label="Candidate" />
          <Tab icon={<WorkOutline />} label="Job" />
        </Tabs>
        <TabPanel index={0} value={value}>
          <QuestionListConnected />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <CandidateInformation />
        </TabPanel>
        <TabPanel index={2} value={value}>
          <JobDetail />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default MeetingInformation;
