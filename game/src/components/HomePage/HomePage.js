import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './HomePage.css'
import Navbar from '../Navbar/Navbar';

function HomePage() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleDemo = () => {
    navigate('/demo');
  };
  return (
    
    <div className="home-page-main">
    <Navbar />
      <div className="home-page">
        <h1>Welcome to the Game !!</h1>
        <button className="start-button" onClick={handleStartGame}>
          Let's Play Now
        </button>
        <button className="demo-button" onClick={handleDemo}>
          Demo
        </button>
      </div>
    </div>
  );
}

export default HomePage;
