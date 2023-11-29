import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Game1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Fix the import statement

import FeedbackForm from "./FeedbackForm";

const questions = {
  easy: [
    {
      question: "What animal is known for its black and white stripes?",
      correctAnswer: "zebra",
      image:
        "https://img.freepik.com/premium-vector/cute-cartoon-funny-zebra-stand_157186-445.jpg",
      hint: "Zebra Hint",
    },
    {
      question:
        "Which animal has a long neck and is often associated with Africa?",
      correctAnswer: "giraffe",
      image:
        "https://t4.ftcdn.net/jpg/02/82/56/21/360_F_282562173_IBawrjFoWRFCv6jpUmvUUpNK7XfZ75BG.jpg",
      hint: "giraffe Hint",
    },
    {
      question:
        "What animal is known for its long ears and is often a favorite character in children's stories?",
      correctAnswer: "rabbit",
      image:
        "https://t4.ftcdn.net/jpg/00/97/96/15/360_F_97961592_oKZUJ5CGP3AbQWj49I1vob1ebHYDYUpC.jpg",
      hint: "rabbit Hint",
    },
    {
      question:
        "Which bird is known for its distinctive 'quacking' sound and is often found in ponds?",
      correctAnswer: "duck",
      image:
        "https://t4.ftcdn.net/jpg/01/05/60/65/360_F_105606579_o1lRcMq5wgoTPcMYzJmXwI7GvsI0PsU4.jpg",
      hint: "duck Hint",
    },
    {
      question:
        "What do you call a small, soft toy often carried around by kids for comfort?",
      correctAnswer: "teddy bear",
      image:
        "https://thumbs.dreamstime.com/b/cute-cartoon-teddy-bear-vector-illustration-valentine-s-day-cute-cartoon-teddy-bear-167675683.jpg",
      hint: "Bear Hint",
    },
    {
      question:
        "What animal can hop and is known for hiding colorful eggs on Easter?",
      correctAnswer: "Easter Bunny",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/161/845/original/cartoon-little-rabbit-holding-easter-egg-in-the-grass-free-vector.jpg",
      hint: "Rabbit Hint",
    },
    {
      question: "What is a baby cat called?",
      correctAnswer: "Kitten",
      image:
        "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE=",
      hint: "Kitten Hint",
    },
    {
      question: "Which farm animal wakes you up in the morning with a crow?",
      correctAnswer: "Rooster",
      image:
        "https://media.istockphoto.com/id/1396407779/vector/rooster-crowing-cartoon.jpg?s=612x612&w=0&k=20&c=1h00a0FrpgUyEfFBLxVIwlG7xlN-0oeKAbnyCQRp7kk=",
      hint: "Hen Hint",
    },
    {
      question:
        "What is the name of the animal with a long trunk that can spray water?",
      correctAnswer: "Elephant",
      image:
        "https://img.freepik.com/premium-vector/cute-elephant-cartoon_160606-195.jpg",
      hint: "Elephant Hint",
    },
    {
      question:
        "Which insect has colorful wings and is often found in gardens?",
      correctAnswer: "Butterfly",
      image:
        "https://i.pinimg.com/originals/06/17/8e/06178e394da300696d7faf6d2f689281.gif",
      hint: "Butterfly Hint",
    },
  ],
  medium: [
    {
      question:
        "What animal is known for its beautiful stripes and is often found in grasslands?",
      correctAnswer: "zebra",
      image:
        "https://img.freepik.com/premium-vector/cute-cartoon-funny-zebra-stand_157186-445.jpg",
      hint: "zebra Hint",
    },
    {
      question:
        "Which bird is known for its vividly colored feathers and is often a symbol of the tropics?",
      correctAnswer: "parrot",
      image:
        "https://t3.ftcdn.net/jpg/05/89/80/74/360_F_589807444_mm326kK29Il5MbL1LHEw6pa9xNn8tNah.jpg",
      hint: "parrot Hint",
    },
    {
      question:
        "What is the name of the soft, stuffed toy bear that lives in the Hundred Acre Wood?",
      correctAnswer: "winnie the pooh",
      image:
        "https://w0.peakpx.com/wallpaper/897/229/HD-wallpaper-winnie-the-pooh-cartoons.jpg",
      hint: "winnie the pooh Hint",
    },
    {
      question: "Which big cat is known for its orange fur and black stripes?",
      correctAnswer: "Tiger",
      image:
        "https://t3.ftcdn.net/jpg/01/18/37/28/360_F_118372873_pZW5X2UaY0jJfGaEiWnBqCqgFKHdH8Jw.jpg",
      hint: "Tiger Hint",
    },
    {
      question: "Which marine animal is known for having eight long tentacles?",
      correctAnswer: "Octopus",
      image:
        "https://t4.ftcdn.net/jpg/02/16/59/23/360_F_216592323_B5AjtZ1s3jhheclegPwfg9D8bFSkRZ7T.jpg",
      hint: "Octopus Hint",
    },
    {
      question: "What does a baby kangaroo look?",
      correctAnswer: "Joey",
      image:
        "https://media.istockphoto.com/id/666853146/vector/cartoon-hopping-kangaroo-vector-illustration.jpg?s=612x612&w=0&k=20&c=nRETAtba3oIQ9-43BAUCxtBM77_M3T7TeNnEb9amvYE=",
      hint: "Joey Hint",
    },
    {
      question: "What is the fastest land animal?",
      correctAnswer: "Cheetah",
      image:
        "https://img.freepik.com/premium-vector/cheetah-cartoon-clipart-vector-illustration_576561-378.jpg",
      hint: "Cheetah Hint",
    },
    {
      question:
        "Which animal can change its color to blend in with its surroundings?",
      correctAnswer: "Chameleon",
      image:
        "https://img.freepik.com/free-vector/cute-chameleon-tree-cartoon-illustration_138676-3262.jpg",
      hint: "Chameleon Hint",
    },
    {
      question: "What do you call a flying mammal that sleeps upside down?",
      correctAnswer: "Bat",
      image:
        "https://t4.ftcdn.net/jpg/01/08/96/05/360_F_108960561_yKoXbFjvPt3uPznqEZSiGxcGiO04Akry.jpg",
      hint: "Bat Hint",
    },
    {
      question:
        "Which bird is famous for its beautiful tail feathers and can dance?",
      correctAnswer: "Peacock",
      image:
        "https://img.freepik.com/premium-vector/beautiful-peacock-cartoon-illustration-isolated-white-background_338371-427.jpg",
      hint: "Peacock Hint",
    },
  ],
  hard: [
    {
      question:
        "What animal is known for its prehensile tail and spends most of its life hanging from trees?",
      correctAnswer: "sloth",
      image:
        "https://media.istockphoto.com/id/1093750176/vector/cute-hanging-sloth.jpg?s=612x612&w=0&k=20&c=Wi7IoI3O4xMA9RvFIs_kWhhtm2GPo_Bs5ogKqCcBNpc=",
      hint: "sloth Hint",
    },
    {
      question:
        "Which bird is known for its melodious songs and is often associated with the start of the day?",
      correctAnswer: "robin",
      image:
        "https://t4.ftcdn.net/jpg/01/24/58/75/360_F_124587579_1Z3GO7MoPz85DWD9eaTsSooJ4dstANZ2.jpg",
      hint: "robin Hint",
    },
    {
      question:
        "What is the name of the toy that consists of a spinning wheel and is a challenge to keep balanced?",
      correctAnswer: "hula hoop",
      image:
        "https://t3.ftcdn.net/jpg/01/65/80/96/360_F_165809685_ClNaciAJHMMO2XemPbpAPNiKtyXiBSZE.jpg",
      hint: "hula hoop Hint",
    },
    {
      question: "What is the world's largest mammal that lives in the ocean?",
      correctAnswer: "Blue Whale",
      image:
        "https://t4.ftcdn.net/jpg/03/15/12/87/360_F_315128738_JiskhiFlDJIIdv9DFOrqdFiJhRXV0J79.jpg",
      hint: "Blue Whale Hint",
    },
    {
      question: "Which bird can rotate its head up to 270 degrees?",
      correctAnswer: "Owl",
      image:
        "https://media.istockphoto.com/id/481018606/vector/owl.jpg?s=612x612&w=0&k=20&c=hbevVqi6LtGdVLd3V4hHkWZ_rBHMfUnmrXo2yxthiPA=",
      hint: "Owl Hint",
    },
    {
      question:
        "Which big cat is known for its powerful roar and is the king of the jungle?",
      correctAnswer: "Lion",
      image:
        "https://i.pinimg.com/originals/a2/7b/ca/a27bca9b813eb75d9fa54ec00d7d9d51.png",
      hint: "Lion Hint",
    },
    {
      question: "What is the largest species of penguin, found in Antarctica?",
      correctAnswer: "Emperor Penguin",
      image:
        "https://media.istockphoto.com/id/506670242/vector/cute-funny-emperor-penguin-presenting-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=Owi04xgH_BewjT-F83Gai8f7ICCC9RGB9YYQmhdHqFE=",
      hint: "Emperor Penguin Hint",
    },
    {
      question: "What is the world's smallest mammal?",
      correctAnswer: "Bumblebee Bat",
      image:
        "https://st5.depositphotos.com/1174456/65398/v/450/depositphotos_653982164-stock-illustration-cute-kawaii-airplane-chibi-mascot.jpg",
      hint: "Bumblebee Bat Hint",
    },
    {
      question:
        "Which animal is known for its armor-like scales and is often seen in deserts?",
      correctAnswer: "Armadillo",
      image:
        "https://static.vecteezy.com/system/resources/previews/003/442/625/non_2x/armadillo-cartoon-illustrations-free-vector.jpg",
      hint: "Armadillo Hint",
    },
    {
      question:
        "What is the name of the playful marine mammals known for balancing balls on their noses?",
      correctAnswer: "Seal",
      image:
        "https://img.freepik.com/premium-vector/cute-little-seal-cartoon-lying-down_188253-2632.jpg",
      hint: "Seal Hint",
    },
  ],
};

function shuffleArray(array) {
  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Game1() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get("difficulty");
  const timer = parseInt(params.get("timer"));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [gameEnded, setGameEnded] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const [shuffledQuestionIndices, setShuffledQuestionIndices] = useState([]);
  const [answerMessage, setAnswerMessage] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);
  const [theme, setTheme] = useState("light"); // Default to light theme
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const currentQuestionData =
    questions[difficulty][shuffledQuestionIndices[currentQuestion]];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Create a copy of the questions for the selected difficulty level
    const questionsForDifficulty = [...questions[difficulty]];
    // Shuffle the question indices when the component mounts or when the difficulty changes
    const indices = Array.from(
      { length: questionsForDifficulty.length },
      (_, i) => i
    );
    shuffleArray(indices);
    setShuffledQuestionIndices(indices);
  }, [difficulty]);

  const handleDragStart = (e, item) => {
    if (!gameEnded) {
      setDraggedItem(item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleHintClick = () => {
    if (!gameEnded && !showHint) {
      setHintIndex(currentQuestion);
      setShowHint(true);
    } else {
      setHintIndex(-1); // Reset the hint for the current question
      setShowHint(false);
    }
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (gameEnded || questionAnswered) {
      return; // Prevent dragging and dropping after the game ends or if the question is already answered
    }
    if (currentQuestion >= questions[difficulty].length) {
      return;
    }
    const currentCorrectAnswer =
      questions[difficulty][shuffledQuestionIndices[currentQuestion]]
        ?.correctAnswer;

    if (
      draggedItem === currentCorrectAnswer &&
      target === currentCorrectAnswer
    ) {
      setAnswerMessage("Correct Answer!");
      setUserScore((prevScore) => prevScore + 2);
    } else {
      setAnswerMessage("Wrong Answer!");
    }
    setDraggedItem(null);
    setQuestionAnswered(true); // Mark the question as answered
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

  const handleNext = () => {
    if (currentQuestion + 1 < shuffledQuestionIndices.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setShowAnimation(false);
      setAnswerMessage("");
      setQuestionAnswered(false); // Reset the question answered state for the next question
    } else {
      setShowAnimation(false);
      setGameEnded(true);
    }
  };

  useEffect(() => {
    // This effect runs whenever gameEnded becomes true
    if (gameEnded) {
      // Create an object with the game data
      const gameData = {
        difficulty: difficulty,
        score: userScore,
        time: timer - timeLeft,
        userId: localStorage.getItem("userId"),
      };
      // Make a POST request to your backend API to store the game data
      axios
        .post("http://localhost:8081/storeGameData", gameData)
        .then((response) => {
          console.log("Game data stored successfully");
        })
        .catch((error) => {
          console.error("Error storing game data", error);
        });
      setShowFeedbackModal(true); // Display the feedback form modal when the game ends
    }
  }, [gameEnded]); // This effect depends on the gameEnded state

  const openFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  return (
    <div className={`game1 ${theme}-theme`}>
      <button className="theme-button" onClick={toggleTheme}>
        {" "}
        Dark Mode{" "}
      </button>
      <h1 className="game-header"> SIX DEGREES Game - {difficulty} Level</h1>
      <div className="game-container">
        {gameEnded ? (
          <div className="game-completed">
            <center>
              <p>Congratulations! You've completed the game.</p>
              <p>Your Score: {userScore}</p>
            </center>
          </div>
        ) : (
          <div className={`questions ${theme}-theme`}>
            <div className="diffcultyAndTime">
              <div className="diffcultyAndTime__box">
                Difficulty Level: {difficulty}
              </div>
              <div className="diffcultyAndTime__box">
                Time Left: {timeLeft} seconds
              </div>
            </div>
            {currentQuestion < shuffledQuestionIndices.length ? (
              <div className="question">
                {
                  questions[difficulty][
                    shuffledQuestionIndices[currentQuestion]
                  ]?.question
                }
              </div>
            ) : null}
            <div className="hint-button">
              <button
                className="hint-btn"
                onClick={handleHintClick}
                disabled={gameEnded}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              {showHint && hintIndex === currentQuestion && (
                <div className="hint-display">
                  <p>Hint: {currentQuestionData.hint}</p>
                </div>
              )}
            </div>

            {answerMessage && (
              <div className={answerMessage}>{answerMessage}</div>
            )}
            {showFeedbackModal && (
              <div className="feedback-modal">
                <button
                  className="close-button"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  X
                </button>
                <FeedbackForm
                  userId={localStorage.getItem("userId")}
                  onClose={() => setShowFeedbackModal(false)}
                />
              </div>
            )}
          </div>
        )}
        {!gameEnded && (
          <div className="images">
            {questions[difficulty].map((question, index) => (
              <div
                key={index}
                className="image-container1"
                draggable
                onDragStart={(e) => handleDragStart(e, question.correctAnswer)}
              >
                <img
                  src={question.image}
                  alt={question.correctAnswer}
                  className={
                    draggedItem === question.correctAnswer ? "dragging" : ""
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {!gameEnded && (
        <div
          className={`target ${
            questionAnswered ||
            draggedItem !==
              questions[difficulty][shuffledQuestionIndices[currentQuestion]]
                ?.correctAnswer
              ? "disabled"
              : ""
          }`}
          onDragOver={handleDragOver}
          onDrop={(e) =>
            handleDrop(
              e,
              questions[difficulty][shuffledQuestionIndices[currentQuestion]]
                ?.correctAnswer
            )
          }
        >
          Drop Here
        </div>
      )}

      <div className="game-buttons">
        <button className="submit-button" onClick={handleNext}>
          {currentQuestion === shuffledQuestionIndices.length - 1
            ? "Submit"
            : "Next"}
        </button>
        {/* Reset Button */}
        <button
          className="reset-button"
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon="sync" /> Reset
        </button>
        <button
          className="feedback-button"
          onClick={() => navigate('/feedback')}
        >
          <FontAwesomeIcon icon="sync" /> Feedback
        </button>

        {/* Home Button with useNavigate */}
        <button className="home-button" onClick={() => navigate("/home")}>
          <FontAwesomeIcon icon="home" /> Exit
        </button>
      </div>
    </div>
  );
}

export default Game1;
