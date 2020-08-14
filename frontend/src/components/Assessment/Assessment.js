import React, { useCallback, useMemo } from 'react';
import {
  Typography,
  Box,
  makeStyles,
  Paper,
  Button,
  Divider,
  SvgIcon,
  Link,
  LinearProgress,
} from '@material-ui/core';
import TakeAways from './TakeAways/TakeAways';
import OverallRating from './OverallRating/OverallRating';
import Scorecard from '../Scorecard/Scorecard';
import { ReactComponent as MagicIcon } from '../../assets/magic.svg';
import useInterviewStateContext from '../../hooks/useInterviewStateContext';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#829AB1',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    fontSize: '1.1rem',
  },
  label: {
    fontWeight: 700,
    color: '#102A43',
    marginRight: theme.spacing(0.5),
  },
  helperText: {
    color: theme.palette.blueGrey[500],
  },
  iconButton: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.375),
    '&:hover': {
      border: `1px solid ${theme.palette.primary.dark}`,
      backgroundColor: theme.palette.primary.dark,
    },
  },
  icon: {
    fontSize: '1rem',
    marginRight: theme.spacing(0.25),
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

const Assessment = () => {
  const classes = useStyles();
  const {
    generateScores,
    saveAssessment,
    scorecardByType,
    isLoadingScores,
  } = useInterviewStateContext();
  return (
    <Paper elevation={0}>
      <Box py={1} pl={3} pr={1}>
        <Box>
          <Typography
            className={classes.title}
            variant="h6"
            paragraph
          >
            Assessment
          </Typography>
          <TakeAways />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={0.5}
          >
            <Typography
              variant="body1"
              className={classes.label}
              paragraph
            >
              Scorecard
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              onClick={generateScores}
              className={classes.link}
            >
              <SvgIcon className={classes.icon} color="primary">
                <MagicIcon />
              </SvgIcon>
              Generate ratings
            </Box>
          </Box>
          {isLoadingScores && <LinearProgress color="secondary" />}
          <Scorecard attributeTypes={scorecardByType} />
          <Typography variant="body1" className={classes.label}>
            Overall Recommendation{' '}
            <Typography
              variant="body2"
              component="span"
              className={classes.helperText}
            >
              — Did the candidate pass the interview?
            </Typography>
          </Typography>
          <OverallRating />
          <Box my={2}>
            <Divider />
          </Box>
          <Box textAlign="right" pb={1}>
            <Button
              size="large"
              onClick={saveAssessment}
              color="primary"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Assessment;
