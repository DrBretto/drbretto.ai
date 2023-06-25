import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
      </Routes>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
