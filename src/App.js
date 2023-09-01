import React, { useEffect, useState } from 'react';
import Form from './Form';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Create Post</h1>
      <Form users={users} />
    </div>
  );
};

export default App;
