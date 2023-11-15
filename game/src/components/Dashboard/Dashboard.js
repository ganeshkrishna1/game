import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState([]);

  const options = {
    animationEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Game Scores",
    },
    data: [
      {
        type: "pie",
        startAngle: -90,
        dataPoints: [
          { y: 20, label: "Easy - 60sec" },
          { y: 24, label: "Medium - 60sec" },
          { y: 20, label: "Hard - 60sec" },
          { y: 14, label: "Easy - 90sec" },
          { y: 12, label: "Medium - 90sec" },
          { y: 10, label: "Hard - 90sec" },
          { y: 14, label: "Easy - 120sec" },
          { y: 12, label: "Medium - 120sec" },
          { y: 10, label: "Hard - 120sec" },
        ],
      },
    ],
  };

  useEffect(() => {
    // Fetch user details from the login table
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8081/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }

    // Fetch game statistics from the game1 table
    axios
      .get(`http://localhost:8081/game1?userId=${userId}`)
      .then((response) => {
        setGameStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game statistics:", error);
      });
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      {/* {user && (
        <div className="user-info">
          <center>
          <br></br>
          <h2>Welcome, {user.name}, See Your Scores Here !!!</h2>
          </center>
        </div>
      )}
      <center>
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
      </center> */}
      <CanvasJSChart
        options={options}
        containerProps={{
          width: "80%",
          margin: "30px auto",
        }}
      />
    </div>
  );
};

export default Dashboard;
