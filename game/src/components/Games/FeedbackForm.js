// FeedbackForm.js

import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import './FeedbackForm.css';
import Navbar from '../Navbar/Navbar';

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Send feedback data to the server
    const feedbackData = {
      rating,
      comments,
    };
  // Log the data before making the POST request
  console.log('Feedback data to be sent:', feedbackData);
    axios
      .post('http://localhost:8081/submitFeedback', feedbackData)
      .then((response) => {
        console.log('Feedback submitted successfully');
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error submitting feedback', error);
      });
  };

  return (<div>
  <Navbar />
    <div className="feedback-form">
      <h2>Feedback</h2>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={handleRatingChange}>
          <option value={0}>Choose</option>
          <option value={1}>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
          <option value={4}>4 stars</option>
          <option value={5}>5 stars</option>
        </select>
      </div>
      <div>
        <label>Comments:</label>
        <textarea value={comments} onChange={handleCommentsChange}></textarea>
      </div>
      <button onClick={handleSubmitFeedback}>Submit</button>
    </div></div>
  );
}

export default FeedbackForm;
