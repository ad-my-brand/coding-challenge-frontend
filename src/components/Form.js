import React, { useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";

const Form = ({ data, getIndex }) => {
  const [selected, setSelected] = useState("select");
  const [currentI, setCurrentI] = useState(null);
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [fields, setFields] = useState({
    accounts: { title: "", body: "" },
    errors: {},
  });

  const validate = () => {
    const errors = {};
    const { accounts } = fields;
    if (accounts.title.trim() === "") {
      errors.title = "title is required";
    }

    if (accounts.body.trim() === "") {
      errors.body = "body is required";
    }
    if (selected === "select") {
      errors.selected = "please select a user name";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const successHandler = () => {
    setSuccess({ status: true, message: "Post have been submited" });
    setTimeout(() => {
      setSuccess({ status: false, message: "" });
    }, 3000);
  };

  const submitPost = async (data) => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        { title: data.title, body: data.body, userId: data.userId }
      );
      if (res.status === 201) {
        successHandler();
        setFields({
          accounts: { title: "", body: "" },
          errors: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFields({ ...fields, errors: errors || {} });
    if (!errors) {
      submitPost({ ...fields.accounts, userId: currentI });
    }
  };

  const handleChange = (e) => {
    const accounts = { ...fields.accounts };
    accounts[e.target.name] = e.target.value;
    setFields({ ...fields, accounts });
  };

  return (
    <form
      className="form_group field"
      onSubmit={handleSubmit}
      autoComplete="off">
      {fields.errors.selected && (
        <div className="error">{fields.errors.selected}</div>
      )}

      {success.status && <div className="success">{success.message}</div>}
      <Dropdown
        data={data}
        selected={selected}
        setSelected={setSelected}
        currentI={currentI}
        setCurrentI={setCurrentI}
        getIndex={getIndex}
      />
      {fields.errors.title && (
        <div className="error">{fields.errors.title}</div>
      )}
      <input
        placeholder="title"
        value={fields.accounts.title}
        onChange={handleChange}
        name="title"
        type="input"
        className="form_field"
      />
      {fields.errors.body && <div className="error">{fields.errors.body}</div>}
      <input
        placeholder="body"
        type="input"
        name="body"
        value={fields.accounts.body}
        onChange={handleChange}
        className="form_field"
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

export default Form;
