import React from 'react';
import { Navbar } from 'react-bootstrap';
import LogoutButton from '../components/LogoutButton';
import Recomndr from '../apps/Recomndr';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import '../css/HomePage.css';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="homepage-background">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">RECOMNDR</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#profile">{currentUser?.sub || 'User'}</a>
          </Navbar.Text>
          <LogoutButton />
        </Navbar.Collapse>
      </Navbar>

      {/* Applet */}
      <div className="applet-container">
        <Recomndr />
      </div>
    </div>
  );
};

export default HomePage;
