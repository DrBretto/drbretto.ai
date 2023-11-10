import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const storedTokens = localStorage.getItem('authTokens');
      return storedTokens ? JSON.parse(storedTokens) : null;
    } catch (error) {
      console.error('Error parsing tokens from localStorage:', error);
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (authTokens && typeof authTokens === 'string') {
      try {
        const decoded = jwtDecode(authTokens);
        setCurrentUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      setCurrentUser(null);
    }
  }, [authTokens]);
  

  const setTokens = (data) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    setCurrentUser(null);
  };

  const isAuthenticated = authTokens !== null;

  return (
    <AuthContext.Provider
      value={{ authTokens, setTokens, logout, isAuthenticated, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
