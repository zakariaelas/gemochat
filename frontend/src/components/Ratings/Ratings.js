import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Tooltip } from '@material-ui/core';
import {
  CancelTwoTone,
  ThumbDownTwoTone,
  RemoveCircleTwoTone,
  ThumbUpTwoTone,
  StarTwoTone,
} from '@material-ui/icons';
import clsx from 'clsx';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'inherit',
  },
  root: {
    border: 'none',
    color: theme.palette.blueGrey[500],
    '&:hover': {
      color: theme.palette.blueGrey[700],
      backgroundColor: 'transparent',
    },
    paddingTop: 0,
    paddingBottom: 0,
  },
  selected: {
    color: `${theme.palette.primary.light} !important`,
    backgroundColor: `transparent !important`,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const Ratings = ({ onChange, value, size = 'default' }) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, value) => onChange(value)}
      >
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
          value="strong_no"
        >
          <Tooltip title="Strong No">
            <CancelTwoTone fontSize={size} className={classes.icon} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
          value="no"
        >
          <Tooltip title="No">
            <ThumbDownTwoTone
              fontSize={size}
              className={classes.icon}
            />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{ root: classes.root, selected: classes.selected }}
          value="mixed"
        >
          <Tooltip title="Mixed">
            <RemoveCircleTwoTone
              fontSize={size}
              className={classes.icon}
            />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{ root: classes.root, selected: classes.selected }}
          value="yes"
        >
          <Tooltip title="Yes">
            <ThumbUpTwoTone
              fontSize={size}
              className={classes.icon}
            />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          disableRipple
          classes={{ root: classes.root, selected: classes.selected }}
          value="strong_yes"
        >
          <Tooltip title="Strong Yes">
            <StarTwoTone fontSize={size} className={classes.icon} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default React.memo(Ratings);
