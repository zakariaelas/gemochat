import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Collapse,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Attribute from './Attribute';

const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: 'pointer',
    color: theme.palette.blueGrey[500],
    transform: 'all .2s',
    '&:hover': {
      color: theme.palette.blueGrey[700],
    },
  },
  typeTitle: {
    fontWeight: 700,
  },
  collapse: {
    paddingTop: theme.spacing(1),
  },
}));

const ScorecardAttribute = ({ type, attributeIds = [] }) => {
  const classes = useStyles();

  return (
    <Box mb={1.5}>
      <Typography
        variant="body2"
        className={classes.typeTitle}
        color="textSecondary"
        gutterBottom
      >
        {type}
      </Typography>
      {attributeIds.map((attributeId) => (
        <Attribute attributeId={attributeId} key={attributeId} />
      ))}
    </Box>
  );
};

export default React.memo(ScorecardAttribute);
