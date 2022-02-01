import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormControl = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(undefined);
  const [error, setError] = useState(false);

  const nameChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  const userList = props.userList;

  let selectedName = undefined;

  if (userId >= 1) {
    selectedName = userList[userId - 1].name;
    console.log(selectedName);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId === undefined || +userId === 0) {
      console.log("UserId", userId);
      setError(true);
    } else {
      setError(false);
      props.processForm(userId);
    }
  };

  const handleButtonCLick = (event) => {
    if (userId === undefined || userId === 0) {
      setError(true);
    } else {
      setError(false);
      navigate("/createNewPost", { state: { userId: userId } });
    }
  };

  const nameOutput = (
    <div className="ui message">
      Selected User:
      <span className="header">{selectedName}</span>
    </div>
  );

  return (
    <div className="ui container" style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit} className="ui form error">
        <div className="ui celled list">
          <label text="Choose a user : "></label>
          <select
            id="userIdSelection"
            onChange={(e) => {
              nameChangeHandler(e);
              setError(false);
            }}
            className="ui selection dropdown"
          >
            <option value="0">Select a user</option>
            {userList &&
              userList.map((user) => {
                return (
                  <option key={user.id} value={user.id} className="item">
                    {user.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="ui error message">
          {error && <p className="header">Please select a user</p>}
        </div>
        <div>{userId === undefined || userId === 0 ? "" : nameOutput}</div>
        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="ui blue button">
            Show location
          </button>
          <button className="ui secondary button" onClick={handleButtonCLick}>
            New Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormControl;
