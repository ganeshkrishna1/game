import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate();
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);
  const difficulties = ['easy', 'medium', 'hard'];

  const handleStartGame = () => {
    setShowDifficultyDialog(true);
  }

  const redirectToGame = (difficulty) => {
    navigate(`/game?difficulty=${difficulty}`);
  }

  const handleDifficultySelect = (difficulty) => {
    console.log(`Selected difficulty: ${difficulty}`);
    redirectToGame(difficulty);
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
              {difficulties.map(diff => (
                <button 
                  key={diff}
                  className={`diff-btn ${diff}-btn`}
                  onClick={() => handleDifficultySelect(diff)}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
