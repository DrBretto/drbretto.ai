import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider that holds the state and function to change the state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check the user's authentication status and return a boolean
  const checkAuthentication = () => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? true : false;
  };

  const setAuthTokens = (tokens) => {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setAuthTokens, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
