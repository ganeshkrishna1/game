import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GamePage.css'

function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = new URLSearchParams(location.search).get('difficulty');

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100); // 2 minutes in seconds
  const [gameEnded, setGameEnded] = useState(false); // New state to track game end
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(''); // 'correct', 'wrong', or ''
  const generateQuestion = () => {
    let newQuestion = '';
    let newOptions = [];
    let newCorrectAnswer = '';

    if (difficulty === 'easy') {
      // Generate easy questions (simple addition, subtraction, multiplication)
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

      newCorrectAnswer = eval(`${num1} ${operator} ${num2}`).toString();

      for (let i = 0; i < 4; i++) {
        const randomOption = (Math.floor(Math.random() * 10)).toString();
        newOptions.push(randomOption);
      }
      newOptions[Math.floor(Math.random() * 4)] = newCorrectAnswer;
      newQuestion = `${num1} ${operator} ${num2}`;
    } else if (difficulty === 'medium') {
      // Generate medium questions (2 digits addition, subtraction, multiplication)
      const num1 = Math.floor(Math.random() * 100);
      const num2 = Math.floor(Math.random() * 100);
      const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

      newCorrectAnswer = eval(`${num1} ${operator} ${num2}`).toString();

      for (let i = 0; i < 4; i++) {
        const randomOption = (Math.floor(Math.random() * 100)).toString();
        newOptions.push(randomOption);
      }
      newOptions[Math.floor(Math.random() * 4)] = newCorrectAnswer;
      newQuestion = `${num1} ${operator} ${num2}`;
    } else if (difficulty === 'hard') {
      // Generate hard questions (BODMAS concepts)
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const num3 = Math.floor(Math.random() * 10);
      const operator1 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
      const operator2 = ['+', '-', '*'][Math.floor(Math.random() * 3)];

      newCorrectAnswer = eval(`(${num1} ${operator1} ${num2}) ${operator2} ${num3}`).toString();

      for (let i = 0; i < 4; i++) {
        const randomOption = (Math.floor(Math.random() * 100)).toString();
        newOptions.push(randomOption);
      }
      newOptions[Math.floor(Math.random() * 4)] = newCorrectAnswer;
      newQuestion = `(${num1} ${operator1} ${num2}) ${operator2} ${num3}`;
    }

    setQuestion(newQuestion);
    setOptions(newOptions);
    setCorrectAnswer(newCorrectAnswer);
  }

  // Function to check the user's answer
  const checkAnswer = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === correctAnswer) {
      setAnswerState('correct');
      // ... rest of your logic
    } else {
      setAnswerState('wrong');
    }
    if (selectedOption === correctAnswer) {
      if (difficulty === 'easy') {
        setUserScore(userScore + 1);
      } else if (difficulty === 'medium') {
        setUserScore(userScore + 2);
      } else if (difficulty === 'hard') {
        setUserScore(userScore + 5);
      }
      generateQuestion(); // Generate the next question

    }
    
  }
  const endGame = () => {
    setGameEnded(true); // Set gameEnded to true
  }

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        endGame(); // Time's up - end the game
      }
    }, 1000);

    return () => {
      clearInterval(timer); // Clean up the timer when the component unmounts
    };
  }, [navigate, timeLeft]);

  useEffect(() => {
    if (!gameEnded) {
      generateQuestion(); // Generate the first question when the component mounts
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
            onClick={() => checkAnswer(option)}
            className={
                selectedOption === option 
                    ? (option === correctAnswer ? 'correct' : 'wrong')
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