import React, { useState, useEffect } from "react";

import "./App.css";
import Form from "./components/Form/Form";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setUsers(data);
    };

    try {
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="App">
      <Form />
      <UsersList users={users} />
    </div>
  );
}

export default App;
