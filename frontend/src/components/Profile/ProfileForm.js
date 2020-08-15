import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../ui/MuiFormikTextField';
import * as yup from 'yup';
import { Box } from '@material-ui/core';
import CircularProgressButton from '../../ui/CircularProgressButton';
import ButtonPrimary from '../../ui/Buttons/ButtonPrimary';

const ProfileForm = ({ isLoading }) => {
  return (
    <Form>
      <Box mb={1}>
        <MuiFormikTextField
          name="displayName"
          label="Display Name"
          margin="dense"
          color="primary"
          id="displayName"
          InputLabelProps={{ shrink: true, htmlFor: 'displayName' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box mb={1}>
        <MuiFormikTextField
          name="email"
          label="Email"
          margin="dense"
          color="primary"
          id="email"
          InputLabelProps={{ shrink: true, htmlFor: 'email' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box mb={1}>
        <MuiFormikTextField
          name="password"
          label="Password"
          type="password"
          color="primary"
          margin="dense"
          id="password"
          InputLabelProps={{ shrink: true, htmlFor: 'password' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box mb={1}>
        <MuiFormikTextField
          name="newPassword"
          label="New Password"
          type="password"
          color="primary"
          margin="dense"
          id="newPassword"
          InputLabelProps={{ shrink: true, htmlFor: 'newPassword' }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box mb={2.5}>
        <MuiFormikTextField
          name="confirmationPassword"
          label="Confirm Password"
          type="password"
          color="primary"
          margin="dense"
          id="confirmationPassword"
          InputLabelProps={{
            shrink: true,
            htmlFor: 'confirmationPassword',
          }}
          FormControlProps={{ fullWidth: true }}
          withGemoStyles
        />
      </Box>
      <Box>
        <CircularProgressButton
          isLoading={isLoading}
          button={
            <ButtonPrimary
              type="submit"
              isLoading={isLoading}
              fullWidth
            >
              Save
            </ButtonPrimary>
          }
        />
      </Box>
    </Form>
  );
};

yup.addMethod(yup.string, 'isSameAs', function (ref, end) {
  return this.test({
    name: 'isSameAs',
    message: 'Passwords do not match',
    exclusive: false,
    test: function (v) {
      return v === this.resolve(ref);
    },
  });
});

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a display name'),
  email: yup
    .string()
    .email()
    .trim()
    .nullable()
    .required('You must enter a valid e-mail'),
  password: yup
    .string()
    .nullable()
    .required('You must enter your password'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nullable()
    .required('You must enter a password'),
  confirmationPassword: yup
    .string()
    .nullable()
    .required('Passwords do not match')
    .isSameAs(yup.ref('newPassword')),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'ProfileForm',
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(ProfileForm);
