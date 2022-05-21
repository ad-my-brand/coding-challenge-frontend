import React, { useEffect, useState } from "react";
import {
  bodyError,
  GET_URL,
  POST_URL,
  titleError,
  userIdError,
} from "../constants";
import MapContainer from "./MapContainer";
import "./myform.css";

const MyForm = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState({
    userId: false,
    title: false,
    body: false,
  });
  const [postData, setPostData] = useState({
    userId: -1,
    title: "",
    body: "",
  });
  const [cordinates, setCordinates] = useState({ lat: 28.6139, lng: 77.209 });
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]:
        e.target.name === "userId" ? +e.target.value : e.target.value,
    });
    if (e.target.name === "userId" && e.target.value != -1) {
      setCordinates({
        lat: parseInt(userList[e.target.value - 1].address.geo.lat),
        lng: parseInt(userList[e.target.value - 1].address.geo.lng),
      });
    }
  };
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  var errorClassName = {
    userId: "",
    title: "",
    body: "",
  };
  // -----Showing Errors-----
  function errorManagement() {
    if (touched.userId && postData.userId === -1) {
      errorClassName.userId = "errorLabel";
    } else errorClassName.userId = "errorLabelHidden";
    if (touched.title && postData.title === "") {
      errorClassName.title = "errorLabel";
    } else errorClassName.title = "errorLabelHidden";
    if (touched.body && postData.body === "") {
      errorClassName.body = "errorLabel";
    } else errorClassName.body = "errorLabelHidden";

    var inputRequired = false;
    if (postData.userId === -1 || postData.title === "" || postData.body === "")
      inputRequired = true;
    return inputRequired;
  }
  errorManagement();
  // -----Showing Errors-----

  const handleSubmission = (e) => {
    e.preventDefault();
    setTouched({ userId: true, title: true, body: true });
    if (errorManagement() === true) return;
    setLoading(true);
    fetch(POST_URL, {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(postData),
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log(response);
        setLoading(false);
        alert("Post created successfully.");
        // throw new Error("Something went wrong");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Post creation unsuccessful.");
      });
  };

  useEffect(() => {
    fetch(GET_URL)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((jsonData) => {
        setUserList(jsonData);
        setLoading(false);
        console.log(jsonData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Could not fetch the users list.");
      });
  }, []);
  useEffect(() => {
    console.log("MyForm rendered.");
    console.log(postData);
    console.log(errorClassName);
  }, [postData]);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmission} className="form">
        <label name="selectedUser" htmlFor="users" className="formLabel">
          Input Form
        </label>
        <div>
          <div className="userLabelAndIcon">
            <label htmlFor="users" className="inputLabel">
              User
            </label>
            {loading && (
              <svg
                width="4rem"
                style={{ margin: "-2rem" }}
                viewBox="0 0 100 100"
              >
                <circle fill="darkblue" stroke="none" cx="6" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"
                  />
                </circle>
                <circle fill="blue" stroke="none" cx="26" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2"
                  />
                </circle>
                <circle fill="lightblue" stroke="none" cx="46" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3"
                  />
                </circle>
              </svg>
            )}
          </div>
          <select
            name="userId"
            id="users"
            onChange={(e) => {
              handleChange(e);
              handleBlur(e);
            }}
          >
            <option value={-1}>{"Select user"}</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <label htmlFor="users" className={errorClassName.userId}>
            {userIdError}
          </label>
        </div>
        <div className="inputContainer">
          <div>
            <label htmlFor="title" className="inputLabel">
              Title
            </label>
            <input
              name="title"
              id="title"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="title" className={errorClassName.title}>
              {titleError}
            </label>
          </div>
          <div>
            <label htmlFor="body" className="inputLabel">
              Body
            </label>
            <input
              name="body"
              id="body"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="body" className={errorClassName.body}>
              {bodyError}
            </label>
          </div>
        </div>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <div className="mapContainer">
        <MapContainer cordinates={cordinates} />
      </div>
    </div>
  );
};

export default MyForm;
