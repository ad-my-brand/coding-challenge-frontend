import React from "react";

export default function FormControl({ users, handleChange }) {
  return (
    <form className="controlForm">
      <label htmlFor="users">Select User: </label>
      <select name="users" onChange={handleChange}>
        <option value="0">none</option>
        {users.map((user) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })} 
      </select>
    </form>
  );
}