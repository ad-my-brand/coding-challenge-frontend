import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UserForm.css';
import dynamic from 'next/dynamic';

const UserMap = dynamic(() => import('./UserMap'), { ssr: false });

const UserForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        body: '',
    });
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Add success state
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
            setSuccess(''); // Clear success message
            return;
        }

        setError('');

        try {
            // Make the API request to create a new post
            const response = await axios.post(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    title: formData.title,
                    body: formData.body,
                    userId: parseInt(formData.userId),
                }
            );

            // Handle success and show a success message
            setSuccess('Post created successfully');
            console.log('Post created:', response.data);

            // Clear the form after successful submission
            setFormData({
                userId: '',
                title: '',
                body: '',
            });
        } catch (error) {
            // Handle error and display an error message
            console.error('Error creating post:', error);
            setError('An error occurred while creating the post');
            setSuccess(''); // Clear success message
        }
    };

    return (
        <div className="w-full">
            <div className="form">
                <UserMap key={userKey} location={location} />
                <br></br>
                <br></br>
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
                        required
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
                        required
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
                        required
                    />
                </div>
                {error && (
                    <p className="error" role="alert" aria-live="assertive">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="success" role="alert" aria-live="assertive">
                        {success}
                    </p>
                )}
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
