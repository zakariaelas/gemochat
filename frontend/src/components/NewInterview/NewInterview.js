import React, { useRef } from 'react';
import InterviewForm from './InterviewForm';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import useCreateInterview from './useCreateInterview';
import InterviewKey from './InterviewKey';

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
          initialValues={{ candidate_id: '', job_id: '' }}
          onSubmit={async (values) => {
            await createInterview(values);
          }}
        />
      )}
    </Dialog>
  );
};
export default NewInterview;
