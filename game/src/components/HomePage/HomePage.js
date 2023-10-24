import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

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
    <div className="home-page">
      <h1>Welcome to the Math Game for Kids</h1>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
      {showDifficultyDialog && (
        <div className="difficulty-dialog">
          <h2>Select Difficulty:</h2>
          <button onClick={() => handleDifficultySelect('easy')}>Easy</button>
          <button onClick={() => handleDifficultySelect('medium')}>Medium</button>
          <button onClick={() => handleDifficultySelect('hard')}>Hard</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
