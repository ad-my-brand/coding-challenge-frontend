import { useEffect, useState } from 'react';
import classes from './App.module.css';
import FormControl from './components/FormControl/FormControl';
import Map from './components/Map/Map';

const initialState = {
  title: '',
  body: '',
  userId: '',
};

function App() {
  const [users, setUsers] = useState([]);

  const [inputValues, setInputValues] = useState(initialState);
  const { title, body, userId } = inputValues;
  const userIdNum = Number.parseInt(userId);

  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUserLocation, setSelectedUserLocation] = useState({});

  const [inputError, setInputError] = useState({
    titleError: null,
    bodyError: null,
  });

  const [httpError, setHttpError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (!response.ok) {
        throw new Error('Something went wrong while fetching user data');
      }
      const jsonResponse = await response.json();
      setUsers(jsonResponse);
    } catch (responseError) {
      setHttpError(responseError.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleValueChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });

    if (event.target.name === 'title') {
      setInputError({
        ...inputError,
        titleError: event.target.value ? null : 'Title cannot be empty',
      });
    }

    if (event.target.name === 'body') {
      setInputError({
        ...inputError,
        bodyError: event.target.value ? null : 'Body cannot be empty',
      });
    }

    if (event.target.type === 'radio') {
      setIsUserSelected(true);
      const selectedUser = users.find(
        (user) => user.id === Number.parseInt(event.target.value)
      );
      setSelectedUserLocation({
        lat: Number.parseFloat(selectedUser?.address.geo.lat),
        lng: Number.parseFloat(selectedUser?.address.geo.lng),
      });
    }
  };

  const postData = async (data) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong posting user data');
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (responseError) {
      setHttpError(responseError.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputError({
      titleError: title ? null : 'Title cannot be empty',
      bodyError: body ? null : 'Body cannot be empty',
    });
    if (!title || !body || !userIdNum) return;
    postData({ ...inputValues, userId: userIdNum });
  };

  let postError;
  if (users.length) {
    if (httpError) {
      postError = <p>{httpError}</p>;
    }
  }

  return (
    <div className={classes.App}>
      <form onSubmit={handleSubmit}>
        {users.length ? (
          users.map((user) => {
            return (
              <FormControl
                key={user.id}
                name="userId"
                label={user.name}
                id={user.id}
                type="radio"
                value={user.id}
                onChange={handleValueChange}
              />
            );
          })
        ) : (
          <p>{httpError}</p>
        )}
        <FormControl
          name="title"
          label="Title"
          onChange={handleValueChange}
          value={title}
          error={inputError.titleError}
        />
        <FormControl
          name="body"
          label="Body"
          onChange={handleValueChange}
          value={body}
          error={inputError.bodyError}
        />
        <button>Submit</button>
      </form>
      {}
      {isUserSelected ? (
        <Map className={classes.Map} center={selectedUserLocation} />
      ) : (
        <p>Please select a user</p>
      )}
      {postError}
    </div>
  );
}

export default App;
