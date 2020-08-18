import React from 'react';
import {
  InputLabel,
  TextField,
  makeStyles,
  FormControl,
  withStyles,
} from '@material-ui/core';

const CustomTextField = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.25),
    '& input:valid:focus + fieldset': {
      borderWidth: 1,
    },
    '&.MuiFormHelperText-root.$': {
      fontWeight: 500,
      marginRight: 0,
    },
  },
}))((props) => <TextField {...props} variant="outlined" />);

const GemoTextField = ({
  FormControlProps,
  InputLabelProps,
  label,
  ...props
}) => {
  return (
    <FormControl {...FormControlProps}>
      <InputLabel {...InputLabelProps}>{label}</InputLabel>
      <CustomTextField {...props} />
    </FormControl>
  );
};

export default GemoTextField;
