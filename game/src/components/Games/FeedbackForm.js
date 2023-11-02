// FeedbackForm.js

import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ userId,onClose }) {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Send feedback data to the server
    const feedbackData = {
      userId,
      rating,
      comments,
    };
  // Log the data before making the POST request
  console.log('Feedback data to be sent:', feedbackData);
    axios
      .post('http://localhost:8081/submitFeedback', feedbackData)
      .then((response) => {
        console.log('Feedback submitted successfully');
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting feedback', error);
      });
  };

  return (
    <div className="feedback-form">
      <h2>Feedback</h2>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={handleRatingChange}>
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
    </div>
  );
}

export default FeedbackForm;