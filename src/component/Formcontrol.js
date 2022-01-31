import React, { useEffect, useState } from "react";
import axios from "axios";
import "./formcontrol.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Formcontrol(props) {
  const [usersInfo, setUsersInfo] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const [formDetails, setFormDetails] = useState({
    user: "",
    title: "",
    body: "",
    userId: "",
  });

  const onGetFocus = () => {
    props.setFocus(true);
  };

  const onGetBlure = () => {
    props.setFocus(false);
  };

  const onMaplatChange = (mapLat) => {
    props.setMapLat(mapLat);
  };

  const onMaplngChange = (mapLng) => {
    props.setMapLng(mapLng);
  };

  const onNameSelect = (userName, id, geo) => {
    setFormDetails({ ...formDetails, user: userName, userId: id });
    onMaplatChange(geo.lat);
    onMaplngChange(geo.lng);
    props.setFocus(false);
  };

  const usersURL = `https://jsonplaceholder.typicode.com/users`;
  const postURL = "https://jsonplaceholder.typicode.com/posts";
  //   const postsURL = `https://jsonplaceholder.typicode.com/posts`;

  useEffect(() => {
    axios.get(usersURL).then((users) => {
      setUsersInfo(users.data);
    });
  }, []);

  const onUserChange = (e) => {
    setDisplayUsers(
      usersInfo.filter((user) =>
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

  const { userId, body, title, user } = formDetails;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(user && userId)) {
      toast.error("Please select a user", { autoClose: 3000 });
    } else {
      if (!(title && body)) {
        toast.error("Please fill all field", { autoClose: 3000 });
      } else {
        axios
          .post(postURL, { userId, body, title })
          .then((res) => toast.success("Success", { autoClose: 3000 }))
          .catch((err) => toast.error(err.message, { autoClose: 3000 }));
        setFormDetails({ user: "", title: "", body: "", userId: "" });
      }
    }
    // if (!(title && body)) toast.error("Please fill all field");
  };

  return (
    <div className="formcontrol_container">
      <form style={{ position: "relative" }}>
        <label htmlFor="user">user:</label>
        <input
          type="text"
          id="user"
          value={formDetails.user}
          onChange={(e) => onUserChange(e)}
          onFocus={onGetFocus}
          onBlur={() => setTimeout(onGetBlure, 200)}
          autoComplete="off"
        />
        <div className="suggested__user">
          <ul>
            {props.focused &&
              displayUsers.map(({ name, id, address }) => (
                <li onClick={() => onNameSelect(name, id, address.geo)}>
                  {name}
                </li>
              ))}
          </ul>
        </div>
        <label htmlFor="title">title:</label>
        <input
          value={formDetails.title}
          required
          type="text"
          id="title"
          onChange={(e) => onTitleChange(e)}
        />
        <label htmlFor="body">body:</label>

        <textarea
          id="body"
          name="w3review"
          rows="8"
          cols="50"
          onChange={(e) => onBodyChange(e)}
          required
          value={formDetails.body}
        ></textarea>

        <button onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}

export default Formcontrol;
