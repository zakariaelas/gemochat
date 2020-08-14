import React from 'react';
import api from '../../api';
import { useMutation } from 'react-query';

const useGenerateScores = (config = {}) => {
  const [mutate, options] = useMutation(
    api.getInterviewScore,
    config,
  );

  return [mutate, options];
};

export default useGenerateScores;
