import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import useInterview from '../../../hooks/useInterview';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import api from '../../../api';
import { InterviewStateProvider } from '../../InterviewStateProvider/InterviewStateProvider';
import _ from 'lodash';

const initialData = {
  entities: {
    interview: {
      0: {
        questions: [],
        scorecard: [],
      },
    },
    questions: {},
    scorecard: {},
  },
  interviewId: '0',
};

const InterviewForm = ({ children }) => {
  const { meetingId } = useParams();
  const history = useHistory();

  const [data, { isFetching, refetch }] = useInterview(meetingId, {
    initialData,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [mutate] = useMutation(api.submitAssessment, {
    onSuccess: () => {
      history.push('/');
    },
  });

  const initialValues = {
    interview: data.entities.interview[data.interviewId],
    questions: data.entities.questions,
    scorecard: data.entities.scorecard,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        const data = {
          ...values.interview,
          questions: _.values(values.questions),
          scorecard: _.values(values.scorecard),
        };
        await mutate({ key: meetingId, data });
      }}
    >
      <InterviewStateProvider>{children}</InterviewStateProvider>
    </Formik>
  );
};

export default InterviewForm;
