import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./profile.css";
const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:8081/users/${userId}`)
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  return (
    <div> <Navbar />
    <div className="profile">
     
      {userProfile ? (
        <div className="profile__main">
          <div className="profile__info">Player Info</div>
          <div className="info">
            <p>
              <b>Name:</b> <div>{userProfile.name}</div>
            </p>
            <p>
              <b>Username:</b> <div>{userProfile.username}</div>
            </p>
            <p>
              <b>Email:</b> <div>{userProfile.email}</div>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div></div>
  );
};

export default Profile;
