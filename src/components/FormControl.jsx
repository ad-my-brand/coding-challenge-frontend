import React, { useState, useEffect } from "react";
import InputControl from "./InputControl";
import SelectControl from "./SelectControl";
import axios from "axios";
import GMaps from "./GMaps";

export default function FormControl() {
  const [users, setusers] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isNotSubmitted, setNotSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState({
    userId: "",
    title: "",
    body: "",
  });
  //Fetching user data on first render
  useEffect(() => {
    getUsers();
  }, []);

  //fetching users
  const getUsers = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        const data = res.data;
        setusers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //posting title, body and userid on submit
  //Prevent default form behaviour
  const postData = (e) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, initialValues)
      .then((res) => {
        setSubmitted(true);
        setNotSubmitted(false);
        //to reset the form fields
        setInitialValues({ title: "", body: "" });
      })
      .catch((error) => {
        console.log(error);
        setNotSubmitted(true);
        setSubmitted(false);
      });
    e.preventDefault();
  };
  //Handeling change from input elements and
  //setting them to matching item in initialvalues object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  //accessing 'value' and 'name' from selectControl
  const handleSelect = (value, name) => {
    setInitialValues((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  return (
    <div className="appContainer">
      <GMaps userId={initialValues.userId} users={users} />
      <div className="formContainer">
        <h1>FORM</h1>
        <form onSubmit={postData}>
          <InputControl
            value={initialValues.title}
            name="title"
            onChange={handleChange}
            heading="Title"
            labelId="title"
          />
          <InputControl
            value={initialValues.body}
            name="body"
            onChange={handleChange}
            heading="Body"
            labelId="body"
          />
          <SelectControl
            users={users}
            name="userId"
            userId={initialValues.userId}
            handleSelect={handleSelect}
          />
          <button type="submit">Submit</button>
          {isSubmitted ? (
            <div className="submitMessage">Form Submission Successful</div>
          ) : (
            ""
          )}
          {isNotSubmitted ? (
            <div className="errorMessage">Form Submission Failed</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
