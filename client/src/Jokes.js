import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/jokes', {
        headers: {
          Authorization: token,
        },
      });
      setJokes(res.data);
    };

    fetchJokes();
  }, []);

  return (
    <div>
      <h2>Jokes</h2>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>{joke.joke}</li>
        ))}
      </ul>
    </div>
  );
};

export default Jokes;
