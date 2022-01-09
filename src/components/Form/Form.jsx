import React, { useState } from "react";
import FormControl from "./FormControl";

import classes from "./Form.module.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [body, setBody] = useState("");
  const [bodyIsValid, setBodyIsValid] = useState(true);

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
    if (title.trim() !== "") {
      setTitleIsValid(true);
    }
  };

  const onBodyChangeHandler = (e) => {
    setBody(e.target.value);
    if (body.trim() !== "") {
      setBodyIsValid(true);
    }
  };

  const onTitleBlurHandler = (e) => {
    if (title.trim() === "") {
      setTitleIsValid(false);
    }
  };

  const onBodyBlurHandler = (e) => {
    if (body.trim() === "") {
      setBodyIsValid(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (title.trim().length === 0 || body.trim().length === 0) {
      if (title.trim() === "") {
        setTitleIsValid(false);
      }

      if (body.trim() === "") {
        setBodyIsValid(false);
      }

      return;
    }

    setTitleIsValid(true);
    setBodyIsValid(true);

    const submitForm = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({ title: title, body: body, userId: 1 }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const userData = await response.json();

      console.log(userData);
    };

    try {
      submitForm();
    } catch (error) {
      console.log(error.message);
      return;
    }

    setTitle("");
    setBody("");

    console.log("Form submitted");
  };

  return (
    <form className={classes["form-controls"]} onSubmit={submitHandler}>
      <FormControl
        type="text"
        id="title"
        label="Title"
        onChange={onTitleChangeHandler}
        isValid={titleIsValid}
        value={title}
        onBlur={onTitleBlurHandler}
      />
      <FormControl
        type="text"
        id="body"
        label="Body"
        onChange={onBodyChangeHandler}
        isValid={bodyIsValid}
        value={body}
        onBlur={onBodyBlurHandler}
      />
      <button className={classes.action} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
