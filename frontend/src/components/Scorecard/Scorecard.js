import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import ScorecardAttribute from './ScorecardAttribute';
import useInterviewStateContext from '../../hooks/useInterviewStateContext';

const useStyles = makeStyles((theme) => ({
  overflowY: {
    overflowY: 'auto',
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'none',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.light}`,
      borderRadius: 32,
    },
  },
}));

const Scorecard = ({ attributeTypes }) => {
  const classes = useStyles();

  return (
    <Box pb={2} pr={1} className={classes.overflowY}>
      {Object.keys(attributeTypes).map((type) => (
        <ScorecardAttribute
          type={type}
          attributeIds={attributeTypes[type]}
          key={type}
        />
      ))}
    </Box>
  );
};

export default React.memo(Scorecard);
