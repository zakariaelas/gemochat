import React from 'react';
import api from '../../api';
import { useMutation } from 'react-query';

const useSaveAssessment = () => {
  const [mutate, options] = useMutation(api.submitAssessment);

  return [mutate, options];
};

export default useSaveAssessment;
