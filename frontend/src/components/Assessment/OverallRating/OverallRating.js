import React, { useMemo, useCallback } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import _ from 'lodash';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';

const useStyles = makeStyles((theme) => ({
  groupRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    flex: 1,
    marginRight: theme.spacing(2),
    padding: theme.spacing(0.25),
    border: `1px solid ${theme.palette.blueGrey[300]}`,
    textTransform: 'initial',
    color: theme.palette.blueGrey[600],
  },
  groupedHorizontal: {
    '&:not(:first-child)': {
      borderLeft: `1px solid ${theme.palette.blueGrey[300]}`,
      borderTopLeftRadius: theme.spacing(0.25),
      borderBottomRightRadius: theme.spacing(0.25),
    },
    '&:not(:last-child)': {
      borderTopRightRadius: theme.spacing(0.25),
      borderBottomRightRadius: theme.spacing(0.25),
    },
  },
  selected: {
    backgroundColor: `${theme.palette.blueGrey[50]} !important`,
  },
  selected_strong_no: {
    backgroundColor: `${theme.palette.error.dark} !important`,
    border: `1px solid ${theme.palette.error.dark}`,
    color: 'white !important',
  },
  selected_no: {
    backgroundColor: `#f8d9de !important`,
    border: `1px solid ${theme.palette.error.dark}`,
    borderLeft: `1px solid ${theme.palette.error.dark} !important`,
    color: `${theme.palette.error.dark}  !important`,
  },
  selected_yes: {
    backgroundColor: `#ccf0ee !important`,
    border: `1px solid ${theme.palette.success.dark}`,
    color: `${theme.palette.success.dark} !important`,
  },
  selected_strong_yes: {
    backgroundColor: `${theme.palette.success.dark} !important`,
    border: `1px solid ${theme.palette.success.dark}`,
    color: 'white !important',
  },
}));

const OverallRating = () => {
  const classes = useStyles();
  const {
    interview: { overall_rating },
    updateInterview,
  } = useInterviewStateContext();

  const onChangeOverallRating = useCallback(
    (_, overall_rating) => {
      updateInterview({ overall_rating });
    },
    [updateInterview],
  );

  return useMemo(
    () => (
      <ToggleButtonGroup
        value={overall_rating}
        exclusive
        onChange={onChangeOverallRating}
        classes={{
          root: classes.groupRoot,
          groupedHorizontal: classes.groupedHorizontal,
        }}
      >
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected_strong_no,
          }}
          value="strong_no"
        >
          Definitely Not
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected_no,
          }}
          value="no"
        >
          No
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected_yes,
          }}
          value="yes"
        >
          Yes
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected_strong_yes,
          }}
          value="strong_yes"
        >
          Strong Yes
        </ToggleButton>
      </ToggleButtonGroup>
    ),
    [classes, overall_rating, onChangeOverallRating],
  );
};

export default OverallRating;
