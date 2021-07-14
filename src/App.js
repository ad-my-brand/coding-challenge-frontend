import { useEffect, useState } from 'react';
import './App.css';
import FormControl from './components/FormControl/FormControl';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((jsonResponse) => setUsers(jsonResponse))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleValueChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hi');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {users.map((user) => {
          console.log(user.id);
          return (
            <FormControl
              key={user.id}
              name="user"
              label={user.name}
              id={user.id}
              type="radio"
              value={user.id}
              onChange={handleValueChange}
            />
          );
        })}
        <FormControl name="title" label="Title" onChange={handleValueChange} />
        <FormControl name="body" label="Body" onChange={handleValueChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
