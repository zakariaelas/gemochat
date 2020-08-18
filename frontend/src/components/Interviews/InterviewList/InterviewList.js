import React from 'react';
import InterviewItem from '../InterviewItem/InterviewItem';
import { Grid } from '@material-ui/core';

const InterviewList = ({ interviews }) => {
  return (
    <Grid container spacing={3}>
      {interviews.map((interview) => (
        <Grid key={interview.id} item lg={4} sm={6} xs={12}>
          <InterviewItem interview={interview} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InterviewList;
