import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrainSpinalCordProvider } from './contexts/BrainSpinalCordContext';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import { ZoomTransitionWrapper } from './tools/ZoomTransitionWrapper';
//import SlideTransitionWrapper from './tools/SlideTransitionWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route
            path="/"
            element={
              <ZoomTransitionWrapper key="login">
                <LoginPage />
              </ZoomTransitionWrapper>
            }
          />
        ) : (
          <Route
            path="/"
            element={
              <ZoomTransitionWrapper key="home">
                <HomePage />
              </ZoomTransitionWrapper>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <BrainSpinalCordProvider>
      <AppContent />
    </BrainSpinalCordProvider>
  </AuthProvider>
);

export default App;
