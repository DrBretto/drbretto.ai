import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedTokens = localStorage.getItem('authTokens');
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      return storedTokens ? JSON.parse(storedTokens) : null;
    } catch (error) {
      console.error('Error parsing authTokens:', error);
      return null;
    }
  });

  const setTokens = (data) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
  };

  const isAuthenticated = authTokens !== null;
  console.log('authTokens:', authTokens);
  console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
    try {
      const storedTokens = localStorage.getItem('authTokens');
      if (storedTokens) {
        setAuthTokens(JSON.parse(storedTokens));
      }
    } catch (error) {
      console.error('Error parsing authTokens:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authTokens, setTokens, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
