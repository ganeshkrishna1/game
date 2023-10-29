import React from 'react';
import "./Games.css";
import Nav from '../Navigation/nav';
import { useNavigate } from 'react-router-dom';
const images = [
    'https://cdn2.momjunction.com/wp-content/uploads/2015/08/21EnjoyableIndoorGamesForKids-1-624x702.jpg.webp',
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
              Login to Play!
            </button>
              </div>
            ))}
          </div>
        </div>
      );
  }

export default Games;