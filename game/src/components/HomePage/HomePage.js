import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate();
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);

  const handleStartGame = () => {
    setShowDifficultyDialog(true);
  }

  const handleDifficultySelect = (difficulty) => {
    // You can perform any necessary actions here based on the selected difficulty
    console.log(`Selected difficulty: ${difficulty}`);
    // Use navigate to transition to the game page with the selected difficulty as a query parameter
    navigate(`/game?difficulty=${difficulty}`);
  }

  return (
    <div className="home-page-main">
      <div className="home-page">
        <h1>Welcome to the Game !!</h1>
        <button className="start-button" onClick={handleStartGame}>
          Let's Play Now
        </button>
        {showDifficultyDialog && (
          <div className="difficulty-dialog">
            <strong>Oops !! Select Difficulty </strong>
            <div className='difficulty-buttons'>
              <button className='diff-btn easy-btn' onClick={() => handleDifficultySelect('easy')}>Easy</button>
              <button className='diff-btn medium-btn' onClick={() => handleDifficultySelect('medium')}>Medium</button>
              <button className='diff-btn hard-btn' onClick={() => handleDifficultySelect('hard')}>Hard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
