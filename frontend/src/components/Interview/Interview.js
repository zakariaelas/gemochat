import React from 'react';
import useIsInterviewValid from '../../hooks/useIsInterviewValid';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Room from '../Room/Room';

const Interview = () => {
  const { meetingId } = useParams();
  const [valid, { isSuccess }] = useIsInterviewValid(meetingId);

  return (
    <>
      {isSuccess && valid ? (
        <Typography>Oops not valid</Typography>
      ) : (
        <Room />
      )}
    </>
  );
};

export default Interview;
