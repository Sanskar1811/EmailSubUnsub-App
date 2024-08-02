import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async () => {
    if (!email) {
      alert('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await axios.post('http://localhost:5000/subscribe', { email });
      alert('Subscribed successfully!');
      setEmail('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleUnsubscribe = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await axios.post('http://localhost:5000/unsubscribe', { email });
      alert('Unsubscribed successfully!');
      setEmail('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
    </div>
  );
};

export default EmailForm;
