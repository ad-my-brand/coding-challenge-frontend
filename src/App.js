import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const validationSchema = Yup.object().shape({
  userId: Yup.number().required('Please select a user from the list'),
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

function App() {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    // Fetch users from the API
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch location data for the selected user when user changes
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === parseInt(selectedUserId));

      if (selectedUser) {
        const { lat, lng } = selectedUser.address.geo;
        setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
      }
    }
  }, [selectedUserId, users]);

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate a post request (replace with your actual API call)
    axios
      .post('https://jsonplaceholder.typicode.com/posts', values)
      .then((response) => {
        console.log('Post created:', response.data);
        toast.success('Post created successfully!', {
          autoClose: 3000,
        });
        setSubmitting(false);
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        toast.error('Error creating post. Please try again.');
        setSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 bg-sky-600 py-2 text-white tracking-wide rounded-md animate-pulse">Create a New Post</h1>
      <Formik
        initialValues={{ userId: '', title: '', body: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-gray-700 font-bold">
                User
              </label>
              <Field
                as="select"
                name="userId"
                className="form-select mt-2 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => {
                  handleChange(e);
                  setSelectedUserId(e.target.value);
                }}
              >
                <option value="">Please select</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="userId" component="div" className="text-red-500 mt-2" />
            </div>
            <div>
              <label htmlFor="title" className="block text-gray-700 font-bold">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="form-input mt-2 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 mt-2" />
            </div>
            <div>
              <label htmlFor="body" className="block text-gray-700 font-bold">
                Body
              </label>
              <Field
                as="textarea"
                name="body"
                className="form-textarea mt-2 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage name="body" component="div" className="text-red-500 mt-2" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">Location</h2>
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={10}
          style={{ height: '300px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
