import React from 'react';
import { useMutation } from 'react-query';
import api from '../../api';

const useGetScores = () => {
  const [mutate, options] = useMutation(api.getInterviewScore);

  return [mutate, options];
};

export default useGetScores;
