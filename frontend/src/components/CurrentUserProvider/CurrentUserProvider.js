import React, { createContext, useState, useCallback } from 'react';
import { jwtVerifyAndDecode } from '../../utils';

const getInitialState = () => {
  const token = jwtVerifyAndDecode(localStorage.token);
  return token.isValid
    ? {
        isAuthenticated: true,
        ...token.payload,
      }
    : {
        isAuthenticated: false,
        role: 'guest',
      };
};

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getInitialState());

  const authUser = useCallback((data) => {
    const { token } = data;
    localStorage.setItem('token', token);
    setCurrentUser({
      isAuthenticated: true,
      ...data,
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, authUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
