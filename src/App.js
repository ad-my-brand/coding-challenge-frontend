import axios from 'axios';
import { useState } from 'react';
import FormControl from './components/FormControl';
import MapBox from './components/MapBox';

const App = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedUser, setSelect] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: '',
  });

  const newError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  const newSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const setSelectedUser = (id) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) =>
        setSelect({
          lat: parseFloat(res.data.address.geo.lat),
          lng: parseFloat(res.data.address.geo.lng),
        })
      )
      .catch((err) => newError("Couldn't fetch data for Users from API"));
  };

  const onChange = (e) => {
    if (e.target.name === 'userId') {
      setPostData({ ...postData, userId: parseInt(e.target.value) });
      setSelectedUser(parseInt(e.target.value));
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!postData.userId) {
      newError('Please Select a User');
    } else {
      try {
        const res = await axios.post(
          'https://jsonplaceholder.typicode.com/posts',
          postData
        );
        //console.log(res.data);
        newSuccess('Data send Successfully!! Check Console for Response.');
      } catch (err) {
        newError(`${err}`);
      }
    }
  };

  return (
    <div className='my-3'>
      <h1 className='text-center text-danger'>Codding Challenge Front End</h1>
      <hr className='text-danger' />
      <div className='d-flex justify-content-center mt-4'>
        <FormControl
          onChange={onChange}
          onSubmit={onSubmit}
          error={error}
          success={success}
          newError={newError}
          postData={postData}
        />
        <MapBox selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default App;
