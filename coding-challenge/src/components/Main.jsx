import React, { useEffect, useState } from "react";
import { ControlForm } from "./ControlForm";

export const Main = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      response = await response.json();
      setUsers(response);
    };
    getData();
  }, []);
  return (
    <div>
      <ControlForm users={users} />
    </div>
  );
};
