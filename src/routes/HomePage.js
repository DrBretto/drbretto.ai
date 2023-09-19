import React from 'react';
import LogoutButton from '../components/LogoutButton';
import '../css/HomePage.css';

import Recomndr from '../apps/Recomndr';

const HomePage = () => {
  return (
    <div className="homepage-background d-flex justify-content-center align-items-center">
      <Recomndr />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
