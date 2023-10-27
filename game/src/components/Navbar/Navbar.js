import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:8081/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  // Simulated logout function
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar">
      {user ? (
        <div className="user-profile">
          <Link to="/profile">
            <img src={user.profileImage} alt={user.name} width="30" height="30" />
          </Link>
          <span>{user.name}</span>
        </div>
      ) : null}
      <Link to="/home">
        Home
      </Link>
      <Link to="/dashboard"> {/* Add this Link component */}
        Dashboard
      </Link>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
