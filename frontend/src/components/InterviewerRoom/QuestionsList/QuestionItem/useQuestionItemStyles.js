import { makeStyles } from '@material-ui/core';

const useQuestionItemStyles = makeStyles((theme) => ({
  listItemTextPrimary: {
    fontSize: theme.spacing(0.875),
  },
  listItemRoot: {
    borderBottom: `1px solid ${theme.palette.blueGrey[100]}`,
    paddingLeft: theme.spacing(0.5),
  },
  done: {
    textDecoration: 'line-through',
    opacity: '0.5',
    '&:hover': {
      opacity: 0.5,
      textDecoration: 'line-through',
    },
  },
  dragEnter: {
    borderTop: `4px solid rgba(216, 212, 247, 0.75)`,
  },
  mainBox: {
    '&:hover $icon': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  icon: {
    display: 'flex',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity .3s',
  },
}));

export default useQuestionItemStyles;
