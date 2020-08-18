import React from 'react';
import SimpleTabs from '../../../ui/SimpleTabs/SimpleTabs';
import SimpleTab from '../../../ui/SimpleTabs/SimpleTab';
import { INTERVIEW_STATUS } from '../../../constants/index';
import useTabs from '../../../hooks/useTabs';

const InterviewsFilter = ({ setFilter }) => {
  const [tab, handleChange] = useTabs(0);

  return (
    <SimpleTabs
      variant="scrollable"
      scrollButtons="auto"
      value={tab}
      onChange={handleChange}
    >
      {Object.keys(INTERVIEW_STATUS).map((key) => (
        <SimpleTab
          key={key}
          label={INTERVIEW_STATUS[key]}
          onClick={() => setFilter(INTERVIEW_STATUS[key])}
        />
      ))}
    </SimpleTabs>
  );
};

export default InterviewsFilter;
