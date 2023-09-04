import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserMap from './UserMap';
import './styles/UserForm.css'; // Import the CSS file

const UserForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        body: '',
    });
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [userKey, setUserKey] = useState(0); // Add a key for UserMap
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Fetch the list of users (user names) from the API
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleUserChange = (e) => {
        const selectedUserId = e.target.value;
        // Set the selected user ID in the form data
        setFormData({ ...formData, userId: selectedUserId });

        // Fetch user details based on the selected user ID
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`)
            .then((response) => {
                setUserData(response.data);
                // Update the map location based on the selected user's coordinates
                setLocation({
                    lat: parseFloat(response.data.address.geo.lat),
                    lng: parseFloat(response.data.address.geo.lng),
                });
                // Update the key to force UserMap to refresh
                setUserKey((prevKey) => prevKey + 1);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId || !formData.title || !formData.body) {
            setError('Please fill out all fields');
            return;
        }

        setError('');

        try {
            // Make the API request to create a new post
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: formData.title,
                body: formData.body,
                userId: parseInt(formData.userId),
            });

            // Handle success (you can show a success message)
            console.log('Post created:', response.data);
        } catch (error) {
            // Handle error and display an error message
            console.error('Error creating post:', error);
            setError('An error occurred while creating the post');
        }
    };

    return (
        <div className="w-full"> {/* Ensure the main container takes up full width */}
            <div className="form">
                <UserMap key={userKey} location={location} />
                <h2 className="header">Create a New Post</h2>
                <div className="input-container">
                    <label htmlFor="userId" className="label">
                        User
                    </label>
                    <select
                        id="userId"
                        name="userId"
                        onChange={handleUserChange}
                        value={formData.userId}
                        className="input"
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="title" className="label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="body" className="label">
                        Body
                    </label>
                    <input
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={(e) => handleInputChange('body', e.target.value)}
                        className="input"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="submit-button"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UserForm;
