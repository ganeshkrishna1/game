import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

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
          <h2>Profile</h2>
          <div>
            <p>Name: {userProfile.name}</p>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
