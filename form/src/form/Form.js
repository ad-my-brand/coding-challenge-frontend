import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isSelectedUserId, setIsSelectedUserId] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isPostFailed, setIsPostFailed] = useState(false);
  const [isPostFullfil, setIsPostFullfil] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const selectedUserName = (e) => {
    setSelectedUserID(e.target.value);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (selectedUserID && title && message) {
      try {
        await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
          title,
          body: message,
          userId: selectedUserID,
        });
        setIsPostFullfil(true);

        setTimeout(() => {
          setIsPostFullfil(false);
        }, 3000);
      } catch (error) {
        setIsPostFailed(true);

        setTimeout(() => {
          setIsPostFailed(false);
        }, 3000);
      }
    } else {
      if (!selectedUserID) {
        setIsSelectedUserId(true);

        setTimeout(() => {
          setIsSelectedUserId(false);
        }, 3000);
      }
      if (!title) {
        setIsTitle(true);

        setTimeout(() => {
          setIsTitle(false);
        }, 3000);
      }

      if (!message) {
        setIsMessage(true);

        setTimeout(() => {
          setIsMessage(false);
        }, 3000);
      }
    }
  };
  return (
    <div className="form">
      <form onSubmit={(e) => submit(e)}>
        <ul className="form-style-1">
          <li>
            <label>Name</label>
            {isSelectedUserId && <small>Please Select Name</small>}
            <select
              name="field4"
              className={
                isSelectedUserId ? "field-select not-selected" : "field-select"
              }
              onChange={(e) => selectedUserName(e)}
            >
              <option disabled selected>
                Choose Name
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>
              Title <span className="required">*</span>
            </label>
            {isTitle && <small>Please Filled Title</small>}
            <input
              className={isTitle ? "field-long not-selected" : "field-long"}
              onChange={(e) => titleHandler(e)}
            ></input>
          </li>
          <li>
            <label>
              Your Message <span className="required">*</span>
            </label>

            {isMessage && <small>Please Write a message</small>}
            <textarea
              name="field5"
              id="field5"
              className={
                isMessage
                  ? "field-long field-textarea not-selected"
                  : "field-long field-textarea"
              }
              onChange={(e) => messageHandler(e)}
            ></textarea>
          </li>
          <li>
            {isPostFullfil && <h3>Successfully Saved information!!</h3>}
            {isPostFailed && <h4>Something is wrong ,Please Try again</h4>}
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form>
    </div>
  );
};
