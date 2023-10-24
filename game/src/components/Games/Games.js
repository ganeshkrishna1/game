import React from 'react';
import "./Games.css";
import Nav from '../Navigation/nav';
import { useNavigate } from 'react-router-dom';
const images = [
    'https://images-workbench.99static.com/xaCz4H7yQkSj57AY63mSvgLbBYM=/99designs-contests-attachments/59/59863/attachment_59863680',
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