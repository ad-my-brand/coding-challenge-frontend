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

  const [error, setError] = useState({
    titleError: null,
    bodyError: null,
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((jsonResponse) => setUsers(jsonResponse))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleValueChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });

    setError({
      titleError: event.target.value ? null : 'Title cannot be empty',
      bodyError: event.target.value ? null : 'Body cannot be empty',
    });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setError({
      titleError: title ? null : 'Title cannot be empty',
      bodyError: body ? null : 'Body cannot be empty',
    });
    if (!title || !body || !userIdNum) return;
    console.log({ ...inputValues, userId: userIdNum });
  };

  return (
    <div className={classes.App}>
      <form onSubmit={handleSubmit}>
        {users.map((user) => {
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
        })}
        <FormControl
          name="title"
          label="Title"
          onChange={handleValueChange}
          value={title}
          error={error.titleError}
        />
        <FormControl
          name="body"
          label="Body"
          onChange={handleValueChange}
          value={body}
          error={error.bodyError}
        />
        <button>Submit</button>
      </form>
      {}
      {isUserSelected ? (
        <Map className={classes.Map} center={selectedUserLocation} />
      ) : (
        <p>Please select a user</p>
      )}
    </div>
  );
}

export default App;
