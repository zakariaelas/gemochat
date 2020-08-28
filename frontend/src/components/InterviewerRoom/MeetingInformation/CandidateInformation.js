import React, { useMemo } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import LoadingContainer from '../../../ui/Spinners/LoadingContainer';

const useStyles = makeStyles((theme) => ({
  capitalize: {
    textTransform: 'capitalize',
  },
}));

const useCandidateInformation = () => {
  const { key } = useParams();
  const { data, ...options } = useQuery(
    ['candidate', { key }],
    api.getCandidateInformation,
    {
      initialStale: true,
      initialData: {
        keyed_custom_fields: {},
      },
    },
  );

  return [data, options];
};

const CandidateInformation = (props) => {
  const classes = useStyles();
  const [candidate, { isFetching }] = useCandidateInformation();
  const custom_fields = useMemo(
    () =>
      Object.entries(candidate.keyed_custom_fields)
        .filter(([k, v]) => v && v.value)
        .reduce((acc, [k, v]) => {
          return {
            ...acc,
            [k]: v,
          };
        }, {}),
    [candidate],
  );
  return (
    <Box pt={2}>
      <LoadingContainer isLoading={isFetching}>
        <Typography variant="h5" paragraph>
          {candidate.candidate_name}
        </Typography>
        {Object.keys(custom_fields).map((key) => (
          <>
            <Typography
              className={classes.capitalize}
              variant="body2"
              color="textSecondary"
            >
              {custom_fields[key].name}
            </Typography>
            <Typography variant="body1" paragraph>
              {custom_fields[key].type === 'multi_select'
                ? custom_fields[key].value.join(', ')
                : custom_fields[key].value}
            </Typography>
          </>
        ))}
      </LoadingContainer>
    </Box>
  );
};

export default CandidateInformation;
