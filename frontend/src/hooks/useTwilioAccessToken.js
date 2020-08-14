import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api';

const useTwilioAccessToken = (display_name, key) => {
  const [token, setToken] = useState('');

  const options = useQuery(
    ['accessToken', { display_name, key }],
    api.getAccessToken,
    {
      onSuccess: (data = {}) => {
        setToken(data.accessToken);
      },
    },
  );

  return [token, options];
};

export default useTwilioAccessToken;
