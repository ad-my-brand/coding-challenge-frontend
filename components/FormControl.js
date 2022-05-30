import React, { useState, useEffect } from "react";
import axios from "axios";
const FormControl = () => {
  const [data, setdata] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <form>
      <label>
        User:<span color="red">*</span>
      </label>
      <br></br>
      <select required id="userId" name="userid">
        <option value={0} key={0}>
          ---Select User---
        </option>
        {data.map((e) => {
          return (
            <option value={e.id} key={e.id}>
              {e.name}-{e.id}
            </option>
          );
        })}
      </select>
      <p id="selecterror"></p>
    </form>
  );
};
export default FormControl;
