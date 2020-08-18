import { Box, Tooltip } from '@material-ui/core';
import { Videocam } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { INTERVIEW_STATUS } from '../../constants';
import useDialog from '../../hooks/useDialog';
import FixedFab from '../../ui/FixedFab';
import LoadingContainer from '../../ui/Spinners/LoadingContainer';
import NewInterview from '../NewInterview/NewInterview';
import InterviewsFilter from './InterviewsFilter/InterviewsFilter';
import InterviewList from './InterviewList/InterviewList';
import useInterviews from './useInterviews';

const Interviews = (props) => {
  const [open, { handleClose, handleOpen }] = useDialog();
  const [filter, setFilter] = useState(INTERVIEW_STATUS.SCHEDULED);

  const setInterviewFilter = useCallback((filter) => {
    setFilter(filter);
  });

  const [interviews, { isLoading }] = useInterviews();

  return (
    <>
      <Box mb={3}>
        <InterviewsFilter setFilter={setInterviewFilter} />
      </Box>
      <LoadingContainer isLoading={isLoading} color="primary">
        <InterviewList
          interviews={interviews.filter(
            (interview) => interview.status === filter,
          )}
        />
      </LoadingContainer>
      <Tooltip title="Add interview">
        <FixedFab
          right="25px"
          bottom="25px"
          onClick={handleOpen}
          color="primary"
        >
          <Videocam />
        </FixedFab>
      </Tooltip>
      <NewInterview open={open} handleClose={handleClose} />
    </>
  );
};

export default Interviews;
