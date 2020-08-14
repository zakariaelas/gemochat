import React, { useEffect } from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../ui/MuiFormikTextField';
import * as yup from 'yup';
import {
  Box,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import CircularProgressButton from '../../ui/CircularProgressButton';

const InterviewForm = ({ isLoading, handleClose }) => {
  return (
    <Form>
      <DialogContent>
        <Box mb={0.5}>
          <MuiFormikTextField
            name="candidate_id"
            label="Candidate ID"
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={0.5}>
          <MuiFormikTextField
            name="job_id"
            label="Job ID"
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>

      <Box mt={1}>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <CircularProgressButton
            fullWidth
            type="submit"
            color="primary"
            isLoading={isLoading}
          >
            Create
          </CircularProgressButton>
        </DialogActions>
      </Box>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  candidate_id: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a valid candidate id'),
  job_id: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a valid candidate id'),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'InterviewForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(InterviewForm);
