import React from 'react';
import "./Games.css";
import Nav from '../Navigation/nav';
import { useNavigate } from 'react-router-dom';
const images = [
    'https://www.logodesignteam.com/images/portfolio-images/kid-games-toys-logo-design/kid-games-toys-logo-design7.jpg',
  ];
function Games() {
    const navigate = useNavigate();
    const handleButtonClick = (imageIndex) => {
        navigate(`/login`);
      }
    return (
        <div className='app-nav'>
          <Nav/>
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img src={image} alt={`Game ${index}`} />
            <button  className="image-button" onClick={() => handleButtonClick(index)}>
              Login to play!
            </button>
              </div>
            ))}
          </div>
        </div>
      );
  }

export default Games;