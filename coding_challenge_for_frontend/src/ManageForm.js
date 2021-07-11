import React, {useState} from 'react';
import FormPage from './FormPage';
import axios from "axios";
import Map from "./Map";

const ManageForm = ({ ...props }) => {
    const [selectedUser, setSelectedUser] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [postData, setPostData] = useState({
      title: '',
      body: '',
      userId: '',
    });

    const successMessage = (msg) => {
      setSuccess(msg);
      setTimeout(() => setSuccess(null), 3000);
    };

    const errorMessage = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };
  
    const setUser = (id) => {
      console.log("setUserCalled")
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) =>
        setSelectedUser({
            lat: parseFloat(res.data.address.geo.lat),
            lng: parseFloat(res.data.address.geo.lng),
          })
        )
        .catch((err) => errorMessage("Couldn't fetch data for Users from API"));
    };
  
    const onChange = (e) => {
      console.log("e.target.value", e.target.value);
      console.log("e.target.name", e.target.name);
      if (e.target.name === 'userId') {
        setPostData({ ...postData, userId: parseInt(e.target.value) });
        setUser(parseInt(e.target.value));
      } else {
        setPostData({ ...postData, [e.target.name]: e.target.value });
      }
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      if (!postData.userId) {
        errorMessage('Please select a user');
      } else {
        try {
          await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            postData
          );
          successMessage('Data saved successfully.');
          setPostData({
            title: '',
            body: '',
            userId: '',
          })
        } catch (err) {
            errorMessage(`${err}`);
        }
      }
    };
  

  return (
    <div className='my-3'>
      <h1 className='text-center text-dark'>Demo Front End</h1>
      <div className='d-flex justify-content-center mt-6'>
        <FormPage
          onChange={onChange}
          onSubmit={onSubmit}
          error={error}
          success={success}
          newError={errorMessage}
          postData={postData}
        />
        <Map selectedUser={selectedUser} />
      </div>
    </div>
  );
};
export default ManageForm;