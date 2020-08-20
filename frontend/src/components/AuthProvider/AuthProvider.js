import React, { createContext, useState, useContext } from 'react';
import { jwtVerifyAndDecode } from '../../utils';
import useLogin from './useLogin';

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

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [{ isAuthenticated, ...user }, setState] = useState(
    getInitialState(),
  );
  const [
    loginMutation,
    { isLoading, isSuccess, isError },
  ] = useLogin();

  const setUser = (data) => {
    localStorage.setItem('token', data.token);
    setState({
      isAuthenticated: true,
      ...data,
    });
  };

  const login = async (credentials) => {
    const data = await loginMutation(credentials);
    if (isSuccess) {
      setUser(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        setUser,
        isLoading,
        isSuccess,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
