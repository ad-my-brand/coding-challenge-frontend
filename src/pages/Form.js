import React, { useState, useEffect } from "react";
import FormControl from "../components/formControl";
import "./form.css";
import EmbeddedMap from "../components/Maps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("70");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorBody, setErrorBody] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    setError("");
  }, [selectedUserId]);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleBodyChange = (newBody) => {
    setBody(newBody);
  };

  const validateUser = (userId) => {
    if(userId !== "70" || userId!=="") return true;
  };

  const validateRequiredTitle = (value) => {
    if(value === ""){
      setErrorTitle(true)
      return false
    }
    setErrorTitle(false)
    return true
  };
  const validateRequiredBody = (value) => {
    if(value === ""){
      setErrorBody(true)
      return false
    }
    setErrorBody(false)
    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errorBody);
    if (selectedUserId == "70") {
      setError("Select a User!");
    }

    if (
      validateUser(selectedUserId) &&
      validateRequiredTitle(title) &&
      validateRequiredBody(body)
    ) {
      const postData = {
        userId: parseInt(selectedUserId),
        title: title,
        body: body,
      };
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("New post created!");
          setUsers('')
          setTitle('')
          setBody('')
          console.log("New post created:", data);
        })
        .catch((error) => toast.error("Error creating post"));
    } else {
      toast.error("Fill all the fields!");
    }
  };

  return (
    <div className="forms">
      <div className="part partform">
        <h1>Register!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="newdivs">
            <label className="labels">User:</label>
            <select
              className="select"
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="70">Select an option</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {error && <p className="para">Please select a user.</p>}
          </div >
          <FormControl
            label="Title:"
            validation={validateRequiredTitle}
            errorMessage=""
            onChange={handleTitleChange}
            />
            {errorTitle && <p className="para">Please enter a title.</p>}

          <FormControl
            label="Body:"
            validation={validateRequiredBody}
            errorMessage=""
            onChange={handleBodyChange}
          />
            {errorBody && <p className="para">Please enter a body.</p>}
          <div className="but">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="part maps">
        <EmbeddedMap />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
