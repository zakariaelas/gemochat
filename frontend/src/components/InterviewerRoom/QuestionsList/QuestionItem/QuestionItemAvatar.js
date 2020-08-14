import React from 'react';
import {
  ListItemAvatar,
  makeStyles,
  Avatar,
  Box,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 30,
    height: 30,
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  ListItemAvatar: {
    minWidth: 0,
    marginRight: theme.spacing(0.75),
  },
  circle: {
    borderRadius: '50%',
    border: `1px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.dark,
    width: 30,
    height: 30,
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: theme.spacing(0.875),
  },
}));

const QuestionItemAvatar = ({ isScored, index }) => {
  const classes = useStyles();
  return (
    <>
      {isScored ? (
        <ListItemAvatar classes={{ root: classes.ListItemAvatar }}>
          <Avatar classes={{ root: classes.avatar }}>
            <Check color="inherit" fontSize="small" />
          </Avatar>
        </ListItemAvatar>
      ) : (
        <Box mr={0.75} className={classes.circle}>
          {index + 1}
        </Box>
      )}
    </>
  );
};

export default QuestionItemAvatar;
