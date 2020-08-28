import React from 'react';
import { Box, Grid } from '@material-ui/core';
import InterviewStateProvider from '../../components/InterviewStateProvider/InterviewStateProvider';
import Assessment from '../../components/Assessment/Assessment';
import MeetingInformation from '../../components/InterviewerRoom/MeetingInformation/MeetingInformation';

const AssessmentPage = () => {
  return (
    <InterviewStateProvider>
      <Box p={0.5}>
        <Grid container spacing={1}>
          <Grid spacing={1} container item lg={8}>
            <Grid item lg={12}>
              <Assessment />
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <MeetingInformation />
          </Grid>
        </Grid>
      </Box>
    </InterviewStateProvider>
  );
};

export default AssessmentPage;
