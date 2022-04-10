import "./App.css";
import FormControl from "./FormControl";
import FormPost from "./FormPost";
import Map from "./Map";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleChange = (e) => {
    setCurrentUser(e.target.value);
  };

  return (
    <div className="App">
      <FormControl users={users} handleChange={handleChange} />
      {currentUser == 0 && <p>Please select a user!</p>}
      {users
        .filter((user) => user.id == currentUser)
        .map((user) => {
          return (
            <div key={user.id} className="container">
              <FormPost userId={user.id}/>
              <Map cord={[user.address.geo.lat, user.address.geo.lng]} />
            </div>
          );
        })}
    </div>
  );
}

export default App;


