import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import api from '../../api';

const useCreateInterview = (props) => {
  const [mutate, options] = useMutation(api.createInterview);

  return [mutate, options];
};

export default useCreateInterview;
