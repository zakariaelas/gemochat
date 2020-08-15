import { useState, useCallback } from 'react';

const useTabs = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  });

  return [value, handleChange];
};

export default useTabs;
