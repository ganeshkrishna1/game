import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

function HomePage() {
  const navigate = useNavigate();
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleDemo = () => {
    setShowDemoPopup(true);
  };

  const handleCloseDemoPopup = () => {
    setShowDemoPopup(false);
  };

  function ImageSlider() {
    return (
      <Carousel showArrows={true}>
        <div>
          <img src="http://localhost:8081/sample.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="http://localhost:8081/sample2.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="http://localhost:8081/sample3.jpg" alt="Image 3" />
        </div>
        {/* Add more images as needed */}
      </Carousel>
    );
  }

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

      {showDemoPopup && (
        <div className="demo-popup-overlay">
          <div className="demo-popup">
            <button className="close-button" onClick={handleCloseDemoPopup}>
              &times;
            </button>
            <div className="demo-left-panel">
              <h2>INSTRUCTIONS</h2>
              <ul>
                <li><p>Welcome to the game! Your job is to match the pictures on the top to their questions below.</p></li>
                <li><p>Click and hold on a picture on the top, then drag it to where you think it matches below.</p></li>
                <li><p>When you think you've matched them correctly, release the mouse button.</p></li>
                <li><p>You'll get a message if you're right or wrong. Keep going until you've matched them all!</p></li>
                <li><p>Got Struck!!! feel free to use hints</p></li>
                <li><p>Have fun and challenge yourself to see how many you can get right!</p></li>
              </ul>
            </div>
            <div className="demo-right-panel">
              <ImageSlider />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
