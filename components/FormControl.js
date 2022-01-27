import React from "react";
import Label from "./shared/Label";

const FormControl = ({ labelText, users = [], onChange, select, id }) => {
  return (
    <>
      <form className="flex flex-col">
        <Label labelText={labelText} />
        <select
          className="m-2 p-1 border-2 rounded-xl mx-auto"
          name="users"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <div className="text-2xl mx-auto font-serif">
          {select ? `User is selected with id ${id}. ` : "Please select a User"}
        </div>
      </form>
    </>
  );
};

export default FormControl;
