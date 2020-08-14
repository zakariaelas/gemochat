import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    borderRadius: theme.spacing(0.25),
    margin: 0,
  },
}));

const RoomSkeleton = () => {
  const classes = useStyles();
  return (
    <Box p={0.5}>
      <Grid container spacing={1}>
        <Grid spacing={1} container item lg={8}>
          <Grid item lg={12}>
            <Skeleton
              classes={{ root: classes.root }}
              variant="rect"
              animation="wave"
              width={983}
              height="20vh"
            />
          </Grid>
          <Grid item lg={12}>
            <Skeleton
              classes={{ root: classes.root }}
              variant="rect"
              animation="wave"
              width={983}
              height="75vh"
            />
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <Skeleton
            classes={{ root: classes.root }}
            variant="rect"
            animation="wave"
            width={507}
            height="95vh"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomSkeleton;
