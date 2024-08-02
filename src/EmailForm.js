import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      await axios.post('https://emailsubscription-app.onrender.com/subscribe', { email });
      alert('Subscribed successfully!');
    } catch (error) {
      alert('Error subscribing!');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.post('https://emailsubscription-app.onrender.com/unsubscribe', { email });
      alert('Unsubscribed successfully!');
    } catch (error) {
      alert('Error unsubscribing!');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
    </div>
  );
};

export default EmailForm;
