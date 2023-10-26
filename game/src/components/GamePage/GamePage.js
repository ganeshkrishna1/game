import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GamePage.css'

function GamePage() {
  const location = useLocation();
  const difficulty = new URLSearchParams(location.search).get('difficulty');
  
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100); // 2 minutes in seconds
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(''); // 'correct', 'wrong', or ''

  const scoreIncrements = { easy: 1, medium: 2, hard: 5 };

  const generateEasyQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const computedAnswer = eval(`${num1} ${operator} ${num2}`);

    setOptions(generateOptions(computedAnswer));
    setQuestion(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(computedAnswer.toString());
  };

  const generateMediumQuestion = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const computedAnswer = eval(`${num1} ${operator} ${num2}`);

    setOptions(generateOptions(computedAnswer));
    setQuestion(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(computedAnswer.toString());
  };

  const generateHardQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const operator1 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const operator2 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const computedAnswer = eval(`(${num1} ${operator1} ${num2}) ${operator2} ${num3}`);

    setOptions(generateOptions(computedAnswer));
    setQuestion(`(${num1} ${operator1} ${num2}) ${operator2} ${num3}`);
    setCorrectAnswer(computedAnswer.toString());
  };

  const generateOptions = (computedAnswer) => {
    const options = [];
    while (options.length < 3) {
      let randomNum = Math.floor(Math.random() * 100);
      if (randomNum !== computedAnswer && !options.includes(randomNum)) {
        options.push(randomNum);
      }
    }
    options.push(computedAnswer);
    return options.sort(() => 0.5 - Math.random());
  };

  const generateQuestion = () => {
    switch(difficulty) {
      case 'easy':
        generateEasyQuestion();
        break;
      case 'medium':
        generateMediumQuestion();
        break;
      case 'hard':
        generateHardQuestion();
        break;
      default:
        console.error("Unknown difficulty level");
    }
  }

  const checkAnswer = (selectedOption) => {
    setSelectedOption(selectedOption);
    const answerStatus = selectedOption === correctAnswer ? 'correct' : 'wrong';
    setAnswerState(answerStatus);
    if (answerStatus === 'correct') {
      setUserScore(prevScore => prevScore + scoreIncrements[difficulty]);
      generateQuestion();
    }
  }

  const endGame = () => {
    setGameEnded(true);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(prevTime => prevTime - 1);
      } else {
        clearInterval(timer);
        endGame();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (!gameEnded) {
      generateQuestion();
    }
  }, [difficulty, gameEnded]);

  return (
    <div className="game-page">
      <h1>Math Game</h1>
      <p>Difficulty: {difficulty}</p>
      <p>Time Left: {timeLeft} seconds</p>
      {!gameEnded ? (
        <div>
          <div className="question">
            <p>{question}</p>
          </div>
          <div className="options">
            {options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => checkAnswer(option.toString())}
                className={
                  selectedOption === option.toString() 
                    ? (option.toString() === correctAnswer ? 'correct' : 'wrong')
                    : ''
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-completed">
          <p>Your score is: {userScore}</p>
        </div>
      )}
    </div>
  );
}

export default GamePage;
