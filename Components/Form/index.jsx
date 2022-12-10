import React from "react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
const Form = ({ data, label, errorMsg, formSubmit }) => {
  const { setshowForm, setPosition, setAddress } = useStateContext();
  const locationRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [NameValid, setNameValid] = useState(false);
  const [BodyValid, setBodyValid] = useState(false);

  const locationHandler = () => {
    const index = locationRef.current.value;
    const { lat, lng } = data[index].address.geo;
    setAddress(data[index].address);
    setPosition([lat, lng]);
  };
  //debounce input
  let timer = false;
  const formValidationHandlerTitle = () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (titleRef.current.value.trim().length < 4) {
      setNameValid(false);
      timer = setTimeout(() => {
        errorMsg("INVALID TITLE");
      }, 500);
    } else {
      setNameValid(true);
    }
  };

  let timerDebounce = false;
  const formValidationHandlerBody = () => {
    if (timerDebounce) {
      clearTimeout(timerDebounce);
    }
    if (bodyRef.current.value.trim().length < 5) {
      setBodyValid(false);
      timerDebounce = setTimeout(() => {
        errorMsg("INVALID BODY");
      }, 500);
    } else {
      setBodyValid(true);
    }
  };

  const onSubmitHandler = () => {
    if (locationRef.current.value === "-1") {
      errorMsg("Please Select a User first");
    } else {
      if (NameValid && BodyValid) {
        formSubmit({
          title: titleRef.current.value,
          body: bodyRef.current.value,
          userId: locationRef.current.value,
        });
        document.getElementById("myform").reset();
        setshowForm(false);
      }
    }
  };

  return (
    <>
      <form
        id="myform"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
        style={{
          zIndex: "2001",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="row">
          <label className="labelText" htmlFor="users">
            Select user
          </label>
          <select
            ref={locationRef}
            onChange={locationHandler}
            className="optionContainer"
          >
            <option value={-1}>select user</option>
            {data?.map((user, index) => (
              <option key={user.id} value={index}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <label htmlFor="Title">{label}</label>
          <input
            onChange={formValidationHandlerTitle}
            ref={titleRef}
            type="text"
            name="Title"
            autoComplete="off"
            placeholder="Title"
            required
          />
          <label
            style={{ textAlign: "right", opacity: `${NameValid ? "1" : "0"}` }}
          >
            Valid Name 😄
          </label>
        </div>

        <div className="row">
          <label htmlFor="Body">Body</label>
          <input
            onChange={formValidationHandlerBody}
            ref={bodyRef}
            type="text"
            name="Body"
            required
            autoComplete="off"
          />
          <label
            style={{ textAlign: "right", opacity: `${BodyValid ? "1" : "0"}` }}
          >
            Valid Body 😄
          </label>
        </div>
        <button type="submit">Sumbit</button>
        <button
          onClick={() => setshowForm(false)}
          style={{
            width: "20px",
            position: "absolute",
            top: "2%",
            right: "5%",
            background: "transparent",
            transform: "translate(-50%, -50%)",
          }}
          type="button"
        >
          ❌
        </button>
      </form>
    </>
  );
};

export default Form;
