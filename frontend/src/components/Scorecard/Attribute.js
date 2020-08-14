import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Link,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Ratings from '../Ratings/Ratings';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import useInterviewStateContext from '../../hooks/useInterviewStateContext';

const useStyles = makeStyles((theme) => ({
  attribute: {
    '&:hover $link': {
      visibility: 'visible',
    },
  },
  link: {
    visibility: 'hidden',
  },
}));

const Attribute = ({ attributeId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { scorecard, updateAttribute } = useInterviewStateContext();

  const onChangeRating = useCallback(
    (rating) => {
      updateAttribute(attributeId, { rating });
    },
    [updateAttribute, attributeId],
  );

  const onChangeNote = useCallback(
    (ev) => {
      const note = ev.target.value;
      updateAttribute(attributeId, { note });
    },
    [updateAttribute, attributeId],
  );

  const attribute = scorecard[attributeId];

  return (
    <Box
      borderBottom="1px solid #D9E2EC"
      display="flex"
      justifyContent="space-between"
      py={0.5}
      pl={2}
      mb={1}
      className={classes.attribute}
    >
      <Typography variant="body2">{attribute.name}</Typography>
      <Box display="flex">
        <Box className={classes.link} mr={1}>
          <Link
            onClick={() => {
              setOpen((open) => !open);
            }}
          >
            {open ? 'Close' : 'Add'} note
          </Link>
        </Box>
        <Box>
          <Ratings
            value={attribute.rating}
            onChange={onChangeRating}
          />
          {open && (
            <Box mt={0.5}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: 'hsl(210, 22%, 49%)',
                }}
                color="textSecondary"
                variant="body2"
                gutterBottom
              >
                Please Explain:
              </Typography>
              <TextField
                value={attribute.note}
                multiline={true}
                rows={3}
                variant="outlined"
                fullWidth
                onChange={onChangeNote}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Attribute);
