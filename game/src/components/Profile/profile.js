import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import "./profile.css";
const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:8081/users/${userId}`)
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  return (
    <div className="profile">
    <Navbar />
      {userProfile ? (
        <div>
          <br></br>
          <center>
          <h2>Player Info</h2>
          </center>
          <div className='info'>
            <p><b>Name:</b> {userProfile.name}</p>
            <p><b>Username:</b> {userProfile.username}</p>
            <p><b>Email:</b> {userProfile.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
