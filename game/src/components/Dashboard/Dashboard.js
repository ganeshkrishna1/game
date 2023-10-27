import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState([]);
  
  useEffect(() => {
    // Fetch user details from the login table
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

    // Fetch game statistics from the game1 table
    axios.get(`http://localhost:8081/game1?userId=${userId}`)
      .then((response) => {
        setGameStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching game statistics:', error);
      });
  }, []);

  return (
    <div className="dashboard">
    <Navbar />
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}</h2>
        </div>
      )}
      <div className="game-stats">
        <h3>Game Statistics:</h3>
        <table>
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {gameStats.map((game, index) => (
              <tr key={index}>
                <td>{game.game1_difficulty}</td>
                <td>{game.game1_time} seconds</td>
                <td>{game.game1_score} points</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
