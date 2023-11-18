import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./GamePage.css";
function HomePage() {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTimer, setSelectedTimer] = useState(null);

  const difficulties = [
    {
      name: "easy",
      label: "Easy",
      imageSrc:
        "https://img.lovepik.com/free-png/20210926/lovepik-game-icon-png-image_401503004_wh1200.png",
    },
    {
      name: "medium",
      label: "Medium",
      imageSrc:
        "https://img.lovepik.com/free-png/20210926/lovepik-game-icon-png-image_401503004_wh1200.png",
    },
    {
      name: "hard",
      label: "Hard",
      imageSrc:
        "https://img.lovepik.com/free-png/20210926/lovepik-game-icon-png-image_401503004_wh1200.png",
    },
  ];

  const timers = [60, 90, 120];

  const handleStartGame = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSelectTimer = (timer) => {
    setSelectedTimer(timer);
  };

  const startGame = () => {
    if (selectedDifficulty && selectedTimer) {
      navigate(
        `/game1?difficulty=${selectedDifficulty}&timer=${selectedTimer}`
      );
    } else {
      // Display an error message or prompt the user to make selections.
    }
  };

  return (
    <div className="gamepage-main">
      <Navbar />
      {selectedDifficulty ? (
        <div className="timer-selection">
          <strong>Select Timer:</strong>
          <div className="timer-buttons">
            {timers.map((timer) => (
              <button
                key={timer}
                className={`timer-btn ${
                  timer === selectedTimer ? "selected" : ""
                }`}
                onClick={() => handleSelectTimer(timer)}
              >
                {timer} sec
              </button>
            ))}
          </div>
          {selectedTimer && (
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      ) : (
        <div className="difficulty-selection">
          <div className="diff-title">Select Difficulty:</div>
          <div className="difficulty-images">
            {difficulties.map((difficulty) => (
              <div key={difficulty.name} className="difficulty-card">
                <img
                  className="dif-img"
                  src={difficulty.imageSrc}
                  alt={difficulty.label}
                  onClick={() => handleStartGame(difficulty.name)}
                />
                <div className="difficulty-label">{difficulty.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
