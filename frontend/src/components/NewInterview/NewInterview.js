import React from 'react';
import InterviewForm from './InterviewForm';
import { Dialog, DialogTitle } from '@material-ui/core';
import useCreateInterview from './useCreateInterview';
import InterviewKey from './InterviewKey';
import moment from 'moment';

const NewInterview = ({ open, handleClose }) => {
  const [
    createInterview,
    { data, isLoading, isSuccess },
  ] = useCreateInterview();
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Create Interview</DialogTitle>
      {isSuccess ? (
        <InterviewKey interviewKey={data.key} />
      ) : (
        <InterviewForm
          isLoading={isLoading}
          handleClose={handleClose}
          initialValues={{
            application_id: '',
            interview_type: '',
            date: moment()
              .add(1, 'days')
              .hours(11)
              .minutes(0)
              .seconds(0)
              .milliseconds(0),
          }}
          onSubmit={async (values) => {
            const data = {
              ...values,
              date: moment(values.date).toISOString(),
            };
            console.log(data);
            await createInterview(data);
          }}
        />
      )}
    </Dialog>
  );
};
export default NewInterview;
