import React, { useRef } from 'react';
import {
  makeStyles,
  Divider,
  Tooltip,
  IconButton,
  Box,
  InputBase,
  Paper,
  Button,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import snackbar from '../../ui/Snackbar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  input: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const InterviewKey = ({ interviewKey, handleClose }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const handleCopy = (e) => {
    inputRef.current.focus();
    inputRef.current.select();
    document.execCommand('copy');
    snackbar.success('Copied to clipboard !');
  };

  return (
    <>
      <DialogContent>
        <Paper
          elevation={2}
          component="form"
          className={classes.root}
        >
          <Box p={0.5} display="flex" alignItems="center">
            <InputBase
              className={classes.input}
              value={`${window.location.host}/${interviewKey}`}
              inputRef={inputRef}
              readOnly
            />
            <Divider
              className={classes.divider}
              orientation="vertical"
            />
            <Tooltip title="Copy to clipboard" placement="bottom">
              <IconButton
                onClick={handleCopy}
                color="primary"
                aria-label="copy"
              >
                <FileCopy />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </DialogContent>
      <Box mt={1}>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            component={Link}
            to={`/${interviewKey}`}
            color="primary"
          >
            Start
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default InterviewKey;
