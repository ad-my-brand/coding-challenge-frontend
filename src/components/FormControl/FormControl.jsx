import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const FormControl = ({ focus, setFocus, setLat, setLng }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const [formDetails, setFormDetails] = useState({
    user: "",
    title: "",
    body: "",
    userId: "",
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((users) => {
      console.log(users.data);
      setUserDetails(users.data);
    });
  }, []);

  const { user, body, title, userId } = formDetails;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(user && userId)) {
      toast.error("Please select a user", { autoClose: 2000 });
    } else if (!(title && body)) {
      toast.error("Please fill the details", { autoClose: 2000 });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          userId,
          body,
          title,
        })
        .then((res) => toast.success("Success", { autoClose: 3000 }))
        .catch((err) => toast.error(err.message, { autoClose: 3000 }));
      setFormDetails({ user: "", title: "", body: "", userId: "" });
    }
  };

  const onNameSelect = (userName, id, geo) => {
    setFormDetails({ ...formDetails, user: userName, userId: id });
    setLat(geo.lat);
    setLng(geo.lng);
    setFocus(false);
  };

  const onUserChange = (e) => {
    setDisplayUsers(
      userDetails.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFormDetails({ ...formDetails, user: e.target.value });
  };

  const onTitleChange = (e) => {
    setFormDetails({ ...formDetails, title: e.target.value });
  };
  const onBodyChange = (e) => {
    setFormDetails({ ...formDetails, body: e.target.value });
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="user">User:</label>
        <input
          id="user"
          type="text"
          value={formDetails.user}
          onChange={(e) => onUserChange(e)}
          onFocus={() => setFocus(true)}
          autoComplete="off"
        />
        <div className="suggested__user">
          <ul>
            {focus &&
              displayUsers.map(({ name, id, address }) => (
                <li onClick={() => onNameSelect(name, id, address.geo)}>
                  {name}
                </li>
              ))}
          </ul>
        </div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={formDetails.title}
          required
          onChange={(e) => onTitleChange(e)}
        />
        <label htmlFor="Body">Body:</label>
        <textarea
          id="body"
          rows="8"
          cols="50"
          value={formDetails.body}
          required
          onChange={(e) => onBodyChange(e)}
        ></textarea>

        <button onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default FormControl;
