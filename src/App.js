import { useEffect, useState } from 'react';
import './App.css';
import FormControl from './components/FormControl/FormControl';

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

  const [selectedUserLocation, setSelectedUserLocation] = useState({});

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
    if (event.target.type === 'radio') {
      const selectedUser = users.find((user) => user.id === userIdNum);
      setSelectedUserLocation(selectedUser?.address.geo);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ ...inputValues, userId: userIdNum });
  };

  return (
    <div className="App">
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
        />
        <FormControl
          name="body"
          label="Body"
          onChange={handleValueChange}
          value={body}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
