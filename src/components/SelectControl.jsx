import React from "react";

export default function SelectControl({ users, name, handleSelect, userId }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSelect(value, name);
  };
  return (
    <div className="selectControl">
      <label htmlFor={name}>Select User</label>
      <select value={userId} name={name} id={name} onChange={handleChange}>
        {users.map((user, index) => {
          return (
            <option key={index} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
