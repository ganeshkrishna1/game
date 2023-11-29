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
  const [options, setOptions] = useState({
    animationEnabled: true,
    theme: "light1",
    title: {
      text: "Game Statistics",
    },
    axisY: {
      title: "Score",
    },
    data: [
      {
        type: "line", // Change type to line
        dataPoints: [],
      },
    ],
  });

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

        // Dynamically update dataPoints based on fetched gameStats
        const newDataPoints = response.data.map((game) => ({
          y: game.game1_score,
          label: `${game.game1_difficulty} - ${game.game1_time}sec`,
        }));

        // Update the options object with dynamic dataPoints and change type to line
        const updatedOptions = {
          ...options,
          data: [
            {
              type: "line",
              dataPoints: newDataPoints,
            },
          ],
        };

        // Set the updated options
        setOptions(updatedOptions);
      })
      .catch((error) => {
        console.error("Error fetching game statistics:", error);
      });
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      {user && (
        <div className="user-info">
          <center>
            <br></br>
            <h2>Welcome, {user.name}, See Your Performance Here !!!</h2>
          </center>
        </div>
      )}

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
