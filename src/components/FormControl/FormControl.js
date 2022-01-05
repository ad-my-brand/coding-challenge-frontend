import React, { useState, useEffect } from "react";

import "./FormControl.css";
import { useNavigate } from "react-router-dom";
import Label from "./Label";

let isTouched = false;

function FormControl(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(undefined);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (userId >= 1 && isTouched) {
      setHasError(false);
    } else if (userId < 1 && isTouched) {
      setHasError(true);
    }
  }, [userId]);

  const nameChangeHandler = (event) => {
    setUserId(event.target.value);
    isTouched = true;
  };

  const userList = props.userList;

  let selectedName = undefined;

  if (userId >= 1) {
    selectedName = userList[userId - 1].name;
    console.log(selectedName);
  }

  const selectionFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log("UserId", typeof userId);
    if (userId === undefined || +userId === 0) {
      console.log("UserId", userId);
      setHasError(true);
    } else {
      setHasError(false);
      props.processForm(userId);
    }
  };

  const newPostRedirectHandler = (event) => {
    if (userId === undefined || userId === 0) {
      setHasError(true);
    } else {
      setHasError(false);
      navigate("/new-post", { state: { userId: userId } });
    }
  };

  const nameOutput = (
    <div className="currentUserContainer">
      Selected User:
      <span className="selectedUserName">{selectedName}</span>
    </div>
  );

  return (
    <form onSubmit={selectionFormSubmitHandler}>
      <div className="sectionFormControl">
        <Label text="Choose a user : " />
        <select
          id="userIdSelection"
          className="form-control"
          onChange={(e) => nameChangeHandler(e)}
        >
          <option value="0">Select a user</option>
          {userList &&
            userList.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="warningTextWrapper">
        {hasError && <p className="warningText">Please select a user</p>}
      </div>
      <div className="currentUserContainer">
        {userId === undefined || userId === 0 ? "No user selected" : nameOutput}
      </div>
      <div className="actionButtonWrapper">
        <button type="submit" className="locationSearchButton actionButton">
          Show location
        </button>
        <button
          type="button"
          className="newPostButton actionButton"
          onClick={newPostRedirectHandler}
        >
          New Post
        </button>
      </div>
    </form>
  );
}

export default FormControl;
