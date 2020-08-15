import React from 'react';
import {
  InputLabel,
  TextField,
  makeStyles,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  OutlinedInput: {
    marginTop: theme.spacing(1.25),
    '& input:valid:focus + fieldset': {
      borderWidth: 1,
    },
  },
}));

const GemoTextField = ({
  FormControlProps,
  InputLabelProps,
  label,
  ...props
}) => {
  const classes = useStyles();
  return (
    <FormControl {...FormControlProps}>
      <InputLabel {...InputLabelProps}>{label}</InputLabel>
      <TextField
        {...props}
        classes={{ root: classes.OutlinedInput }}
        variant="outlined"
      />
    </FormControl>
  );
};

// MuiFormControlLabel: {
//   root: {
//     margin: theme.spacing(1),
//   },
// },
// MuiOutlinedInput: {
//   root: {
//     marginTop: theme.spacing(0.75),
//     '& input:valid:focus + fieldset': {
//       borderWidth: 1,
//     },
//   },
// },

export default GemoTextField;
