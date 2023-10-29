import React from 'react';
import "./Games.css";
import Nav from '../Navigation/nav';
import { useNavigate } from 'react-router-dom';
const images = [
    'https://1.bp.blogspot.com/-tyIlXNOi9y0/XWpFkTnQfxI/AAAAAAAAF6g/kXvqo3Pn-DoAB4N-FkJyqVf3hmiDzdzwACLcBGAs/s1600/Cara-Mengaktifkan-Drag-%2526-Drop-Footage-di-Premiere-Pro.jpg',
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