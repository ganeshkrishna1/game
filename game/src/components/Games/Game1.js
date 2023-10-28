import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Game1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const questions = {
  easy: [
    {
      question: 'What animal is known for its black and white stripes?',
      correctAnswer: 'zebra',
      image: 'https://img.freepik.com/premium-vector/cute-cartoon-funny-zebra-stand_157186-445.jpg',
    },
    {
      question: 'Which animal has a long neck and is often associated with Africa?',
      correctAnswer: 'giraffe',
      image: 'https://t4.ftcdn.net/jpg/02/82/56/21/360_F_282562173_IBawrjFoWRFCv6jpUmvUUpNK7XfZ75BG.jpg',
    },
    {
      question: "What animal is known for its long ears and is often a favorite character in children's stories?",
      correctAnswer: "rabbit",
      image: "https://t4.ftcdn.net/jpg/00/97/96/15/360_F_97961592_oKZUJ5CGP3AbQWj49I1vob1ebHYDYUpC.jpg",
    },
    {
      question: "Which bird is known for its distinctive 'quacking' sound and is often found in ponds?",
      correctAnswer: "duck",
      image: "https://t4.ftcdn.net/jpg/01/05/60/65/360_F_105606579_o1lRcMq5wgoTPcMYzJmXwI7GvsI0PsU4.jpg",
    },
    {
      question: "What do you call a small, soft toy often carried around by kids for comfort?",
      correctAnswer: "teddy bear",
      image: "https://thumbs.dreamstime.com/b/cute-cartoon-teddy-bear-vector-illustration-valentine-s-day-cute-cartoon-teddy-bear-167675683.jpg",
    },
    {
        question: "What animal can hop and is known for hiding colorful eggs on Easter?",
        correctAnswer: "Easter Bunny",
        image: "https://static.vecteezy.com/system/resources/previews/005/161/845/original/cartoon-little-rabbit-holding-easter-egg-in-the-grass-free-vector.jpg",
    },
    {
        question: "What is a baby cat called?",
        correctAnswer: "Kitten",
        image: "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE=",
    },
    {
        question: "Which farm animal wakes you up in the morning with a crow?",
        correctAnswer: "Rooster",
        image: "https://media.istockphoto.com/id/1396407779/vector/rooster-crowing-cartoon.jpg?s=612x612&w=0&k=20&c=1h00a0FrpgUyEfFBLxVIwlG7xlN-0oeKAbnyCQRp7kk=",
    },
    {
        question: "What is the name of the animal with a long trunk that can spray water?",
        correctAnswer: "Elephant",
        image: "https://img.freepik.com/premium-vector/cute-elephant-cartoon_160606-195.jpg",
    },
    {
        question: "Which insect has colorful wings and is often found in gardens?",
        correctAnswer: "Butterfly",
        image: "https://i.pinimg.com/originals/06/17/8e/06178e394da300696d7faf6d2f689281.gif",
    },
  ],
  medium: [
    {
      question: "What animal is known for its beautiful stripes and is often found in grasslands?",
      correctAnswer: "zebra",
      image: "https://img.freepik.com/premium-vector/cute-cartoon-funny-zebra-stand_157186-445.jpg",
    },
    {
      question: "Which bird is known for its vividly colored feathers and is often a symbol of the tropics?",
      correctAnswer: "parrot",
      image: "https://t3.ftcdn.net/jpg/05/89/80/74/360_F_589807444_mm326kK29Il5MbL1LHEw6pa9xNn8tNah.jpg",
    },
    {
      question: "What is the name of the soft, stuffed toy bear that lives in the Hundred Acre Wood?",
      correctAnswer: "winnie the pooh",
      image: "https://w0.peakpx.com/wallpaper/897/229/HD-wallpaper-winnie-the-pooh-cartoons.jpg",
    },
    {
        question: "Which big cat is known for its orange fur and black stripes?",
        correctAnswer: "Tiger",
        image: "https://t3.ftcdn.net/jpg/01/18/37/28/360_F_118372873_pZW5X2UaY0jJfGaEiWnBqCqgFKHdH8Jw.jpg",
    },
    {
        question: "Which marine animal is known for having eight long tentacles?",
        correctAnswer: "Octopus",
        image: "https://t4.ftcdn.net/jpg/02/16/59/23/360_F_216592323_B5AjtZ1s3jhheclegPwfg9D8bFSkRZ7T.jpg",
    },
    {
        question: "What does a baby kangaroo look?",
        correctAnswer: "Joey",
        image: "https://media.istockphoto.com/id/666853146/vector/cartoon-hopping-kangaroo-vector-illustration.jpg?s=612x612&w=0&k=20&c=nRETAtba3oIQ9-43BAUCxtBM77_M3T7TeNnEb9amvYE=",
    },
    {
        question: "What is the fastest land animal?",
        correctAnswer: "Cheetah",
        image: "https://img.freepik.com/premium-vector/cheetah-cartoon-clipart-vector-illustration_576561-378.jpg",
    },
    {
        question: "Which animal can change its color to blend in with its surroundings?",
        correctAnswer: "Chameleon",
        image: "https://img.freepik.com/free-vector/cute-chameleon-tree-cartoon-illustration_138676-3262.jpg",
    },
    {
        question: "What do you call a flying mammal that sleeps upside down?",
        correctAnswer: "Bat",
        image: "https://t4.ftcdn.net/jpg/01/08/96/05/360_F_108960561_yKoXbFjvPt3uPznqEZSiGxcGiO04Akry.jpg",
    },
  ],
  hard: [
    {
      question: "What animal is known for its prehensile tail and spends most of its life hanging from trees?",
      correctAnswer: "sloth",
      image: "https://media.istockphoto.com/id/1093750176/vector/cute-hanging-sloth.jpg?s=612x612&w=0&k=20&c=Wi7IoI3O4xMA9RvFIs_kWhhtm2GPo_Bs5ogKqCcBNpc=",
    },
    {
      question: "Which bird is known for its melodious songs and is often associated with the start of the day?",
      correctAnswer: "robin",
      image: "https://t4.ftcdn.net/jpg/01/24/58/75/360_F_124587579_1Z3GO7MoPz85DWD9eaTsSooJ4dstANZ2.jpg",
    },
    {
      question: "What is the name of the toy that consists of a spinning wheel and is a challenge to keep balanced?",
      correctAnswer: "hula hoop",
      image: "https://t3.ftcdn.net/jpg/01/65/80/96/360_F_165809685_ClNaciAJHMMO2XemPbpAPNiKtyXiBSZE.jpg",
    },
    {
        question: "What is the world's largest mammal that lives in the ocean?",
        correctAnswer: "Blue Whale",
        image: "https://t4.ftcdn.net/jpg/03/15/12/87/360_F_315128738_JiskhiFlDJIIdv9DFOrqdFiJhRXV0J79.jpg",
    },
    {
        question: "Which bird can rotate its head up to 270 degrees?",
        correctAnswer: "Owl",
        image: "https://media.istockphoto.com/id/481018606/vector/owl.jpg?s=612x612&w=0&k=20&c=hbevVqi6LtGdVLd3V4hHkWZ_rBHMfUnmrXo2yxthiPA=",
    },
    {
        question: "Which big cat is known for its powerful roar and is the king of the jungle?",
        correctAnswer: "Lion",
        image: "https://i.pinimg.com/originals/a2/7b/ca/a27bca9b813eb75d9fa54ec00d7d9d51.png",
    },
    {
        question: "What is the largest species of penguin, found in Antarctica?",
        correctAnswer: "Emperor Penguin",
        image: "https://media.istockphoto.com/id/506670242/vector/cute-funny-emperor-penguin-presenting-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=Owi04xgH_BewjT-F83Gai8f7ICCC9RGB9YYQmhdHqFE=",
    },
    {
        question: "What is the world's smallest mammal?",
        correctAnswer: "Bumblebee Bat",
        image: "https://st5.depositphotos.com/1174456/65398/v/450/depositphotos_653982164-stock-illustration-cute-kawaii-airplane-chibi-mascot.jpg",
    },

  ],
};

function Game1() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty');
  const timer = parseInt(params.get('timer'));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [gameEnded, setGameEnded] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const navigate = useNavigate();

  const handleDragStart = (e, item) => {
    if (!gameEnded) {
      setDraggedItem(item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();

    if (gameEnded) {
      return; // Prevent dragging and dropping after the game ends
    }

    if (currentQuestion >= questions[difficulty].length) {
      // All questions have been answered
      return;
    }

    const currentCorrectAnswer = questions[difficulty][currentQuestion].correctAnswer;

    if (draggedItem === currentCorrectAnswer && target === currentCorrectAnswer) {
      // Correct answer, move to the next question and assign points
      setUserScore((prevScore) => prevScore + 2);
    }

    if (currentQuestion + 1 < questions[difficulty].length) {
      // If there's another question, move to the next one
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // No more questions, end the game
      setGameEnded(true);
    }

    setDraggedItem(null);
  };

  const decrementTime = () => {
    if (timeLeft > 0) {
      setTimeLeft((prevTime) => prevTime - 1);
    } else {
      setGameEnded(true);
    }
  };

  useEffect(() => {
    if (!gameEnded) {
      const timer = setInterval(decrementTime, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameEnded]);

  useEffect(() => {
    // This effect runs whenever gameEnded becomes true
    if (gameEnded) {
      // Create an object with the game data
      const gameData = { difficulty: difficulty, score: userScore, time: timer - timeLeft, userId: localStorage.getItem('userId'), };
      // Make a POST request to your backend API to store the game data
      axios.post('http://localhost:8081/storeGameData', gameData)
        .then((response) => {
          console.log('Game data stored successfully');
        })
        .catch((error) => {
          console.error('Error storing game data', error);
        });
    }
  }, [gameEnded]); // This effect depends on the gameEnded state

  return (
    <div className="game1">
      <h1>Drag and Drop Game - {difficulty} Level</h1>
      <div className="game-container">
        <div className="questions">
          <p>Difficulty: {difficulty}</p>
          <p>Time Left: {timeLeft} seconds</p>
          {currentQuestion < questions[difficulty].length ? (
            <div className="question">{questions[difficulty][currentQuestion].question}</div>
          ) : null}
          {gameEnded && (
            <div className="game-completed">
              <p>Congratulations! You've completed the game.</p>
              <p>Your Score: {userScore}</p>
            </div>
          )}
        </div>
        <div className="images">
          {questions[difficulty].map((question, index) => (
            <div
              key={index}
              className="image-container"
              draggable
              onDragStart={(e) => handleDragStart(e, question.correctAnswer)}
            >
              <img
                src={question.image}
                alt={question.correctAnswer}
                className={draggedItem === question.correctAnswer ? 'dragging' : ''}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`target ${
          draggedItem === questions[difficulty][currentQuestion].correctAnswer ? 'valid' : ''
        }`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, questions[difficulty][currentQuestion].correctAnswer)}
      >
        Drop Here
      </div>

      <div className='game-buttons'>
       {/* Reset Button */}
        <button className="reset-button" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon="sync" /> Reset
        </button>

        {/* Home Button with useNavigate */}
        <button className="home-button" onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon="home" /> Home
        </button>
      </div>
    </div>
  );
}

export default Game1;
