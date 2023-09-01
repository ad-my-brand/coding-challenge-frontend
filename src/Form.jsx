import React, { useState, useEffect } from 'react';
import FormControl from './FormControl';
import MapContainer from './map';

const Form = () => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [users, setUsers] = useState([]); 
  const [userLocation, setUserLocation] = useState(null); 
  const [errorMessage, setErrorMessage] = useState('');


  const fetchUserLocation = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      console.log('User location data:', data); 
      const { lat, lng } = data.address.geo;
      console.log('User location coordinates:', lat, lng); 
      setUserLocation([parseFloat(lat), parseFloat(lng)]);
    } catch (error) {
      console.error('Error fetching user location:', error);
      setErrorMessage('Failed to fetch user location. Please try again.');
    }
  };
  

  const getNextId = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc&_limit=1');
      const data = await response.json();
      if (data.length === 0) {
        return 1; 
      }
      return data[0].id + 1; 
    } catch (error) {
      console.error('Error fetching last post:', error);
      return 1; 
    }
  };

  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setErrorMessage('Failed to fetch users. Please try again.');
      });
  }, []); 
  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setUserId(selectedUserId);

    fetchUserLocation(selectedUserId);
  };
  const handleSubmit = async () => {
  
    if (!userId || !title || !body) {
      setErrorMessage('Please enter valid data in all fields.');
      return;
    }

 
    setErrorMessage('');

    
    const id = await getNextId();


    const postData = {
      userId,
      id,
      title,
      body,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Post created successfully');
          return response.json();
        } else {
          console.error('Failed to create post');
          throw new Error('Failed to create post');
        }
      })
      .then((data) => {
        console.log('Response data:', data);
        alert('Post created successfully');
        setUserId('');
        setTitle('');
        setBody('');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        setErrorMessage('Failed to create post. Please try again.');
      });
  };

  return (
    <form className="form-container">
    <div className="form-element">
      <label className="form-label">User</label>
      <select
        className="form-select"
        value={userId}
        onChange={handleUserChange}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>

    <FormControl
      label="Title (Text)"
      validationFunc={(value) => !!value}
      errorMessage="Title is required"
      onChange={setTitle}
      className="form-element"
    />

    <FormControl
      label="Body (Text)"
      validationFunc={(value) => !!value}
      errorMessage="Body is required"
      onChange={setBody}
      className="form-element"
    />

    <button className="form-button" type="button" onClick={handleSubmit}>
      Submit
    </button>

    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {userId && userLocation && <MapContainer userLocation={userLocation} />}
  </form>
);
};

export default Form;
