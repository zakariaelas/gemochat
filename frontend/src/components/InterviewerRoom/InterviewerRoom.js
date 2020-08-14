import React from 'react';
import { Box, Grid } from '@material-ui/core';
import RoomQuestions from './RoomQuestions/RoomQuestions';
import MeetingInformation from './MeetingInformation/MeetingInformation';
import MainBlock from './MainBlock/MainBlock';

const InterviewerRoom = ({ displayName }) => {
  return (
    <Box p={0.5}>
      <Grid container spacing={1}>
        <Grid spacing={1} container item lg={8}>
          <RoomQuestions />
          <Grid item lg={12}>
            <MainBlock displayName={displayName} />
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <MeetingInformation />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterviewerRoom;
