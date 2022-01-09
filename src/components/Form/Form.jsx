import React, { useState } from "react";
import FormControl from "./FormControl";

import classes from "./Form.module.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onBodyChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      return;
    }

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
        value={title}
      />
      <FormControl
        type="text"
        id="body"
        label="Body"
        onChange={onBodyChangeHandler}
        value={body}
      />
      <button className={classes.action} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
