import React from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { Form, withFormik } from 'formik';
import * as yup from 'yup';
import CircularProgressButton from '../../ui/Buttons/CircularProgressButton';
import MuiFormikTextField from '../../ui/Formik/MuiFormikTextField';

const InterviewForm = ({ isLoading, handleClose }) => {
  return (
    <Form>
      <DialogContent>
        <Box mb={0.5}>
          <MuiFormikTextField
            name="application_id"
            label="Application ID"
            margin="dense"
            InputLabelProps={{ shrink: true, htmlFor: 'email' }}
            FormControlProps={{ fullWidth: true }}
            withGemoStyles
          />
        </Box>
        <Box mb={0.5}>
          <MuiFormikTextField
            name="date"
            label="Interview Date"
            type="datetime-local"
            margin="dense"
            InputLabelProps={{ shrink: true, htmlFor: 'email' }}
            FormControlProps={{ fullWidth: true }}
            withGemoStyles
          />
        </Box>
        <Box mb={0.5}>
          <MuiFormikTextField
            name="interview_type"
            label="Interview Type"
            margin="dense"
            InputLabelProps={{ shrink: true, htmlFor: 'email' }}
            FormControlProps={{ fullWidth: true }}
            withGemoStyles
          />
        </Box>
      </DialogContent>

      <Box mt={1}>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <CircularProgressButton
            isLoading={isLoading}
            button={
              <Button color="primary" type="submit">
                Create
              </Button>
            }
          />
        </DialogActions>
      </Box>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  application_id: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a valid application id'),
  interview_type: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a valid interview type '),
  date: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a valid date'),
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
