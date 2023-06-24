import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    // Clear the tokens from storage (or wherever you're storing them)
    localStorage.removeItem('token');

    // Update the AuthContext state
    setIsAuthenticated(false);
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
