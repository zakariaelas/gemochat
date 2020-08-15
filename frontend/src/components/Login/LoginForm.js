import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../ui/MuiFormikTextField';
import * as yup from 'yup';
import { Box } from '@material-ui/core';
import CircularProgressButton from '../../ui/CircularProgressButton';

const LoginForm = ({ isLoading }) => {
  return (
    <Form>
      <Box mb={1}>
        <MuiFormikTextField
          name="email"
          variant="outlined"
          label="Email"
          margin="dense"
          color="secondary"
          id="email"
          InputLabelProps={{ shrink: true, htmlFor: 'email' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box mb={1.25}>
        <MuiFormikTextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          color="secondary"
          margin="dense"
          id="password"
          InputLabelProps={{ shrink: true, htmlFor: 'password' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box>
        <CircularProgressButton
          style={{
            textTransform: 'initial',
            fontWeight: 600,
          }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
        >
          Sign in
        </CircularProgressButton>
      </Box>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('You must enter a valid email')
    .nullable()
    .required('You must enter an e-mail'),
  password: yup
    .string()
    .nullable()
    .required('You must enter a password'),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'LoginForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(LoginForm);
