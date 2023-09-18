import React from 'react';
import LogoutButton from '../components/LogoutButton';
import '../css/HomePage.css';
import DraggableWidget from '../components/DraggableWidget';
import Recomndr from '../apps/Recomndr';
import MotherBrainOutput from '../components/MotherBrainOutput';
import Chromostereopsis from '../apps/Chromostereopsis';

const HomePage = () => {
  return (
    <div className="homepage-background d-flex justify-content-center align-items-center">
      <Chromostereopsis />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
