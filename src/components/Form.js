import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import MyButton from "./MyButton";
import axios from "axios";
import MySnackbar from "./Snackbar";
import { CREATE_SUCCESS_MESS } from "../constants/Utilities";

const MyForm = (props) => {
  const [selectedUserId, setSelectedUserId] = useState("0");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOnchange = (id) => {
    setSelectedUserId(id);
    if (id < 1) {
      setValidated(false);
    }
    props.onChange(id - 1);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (selectedUserId < "1") {
      return;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = JSON.stringify({
        userId: selectedUserId,
        title: title,
        body: body,
      });

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      await axios
        .post("https://jsonplaceholder.typicode.com/posts", data, axiosConfig)
        .then((res) => {
          console.log(res.data);
          setSeverity("success");
          setSnackbarMessage(CREATE_SUCCESS_MESS);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error.response.data);
          setSeverity("error");
          setSnackbarMessage(error.response.data);
          setOpen(true);
        });
    }

    setValidated(true);
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Select
        isInvalid={selectedUserId < "1"}
        isValid={selectedUserId > "0"}
        value={selectedUserId}
        onChange={(e) => handleOnchange(e.target.value)}
        required
        id="users"
      >
        <option value="0">{props.label}</option>
        {props.users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </Form.Select>

      <div className="mt-2">
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title.."
            required
            id="title"
          />
          <Form.Control.Feedback type="invalid">
            Title is required.
          </Form.Control.Feedback>
        </InputGroup>
      </div>

      <div className="mt-2">
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body.."
            required
            id="body"
          />
          <Form.Control.Feedback type="invalid">
            Body is required.
          </Form.Control.Feedback>
        </InputGroup>
      </div>

      {selectedUserId < 1 ? (
        <MyButton className="disabled float-end mt-3" />
      ) : (
        <MyButton loading={loading} />
      )}
      <MySnackbar severity={severity} open={open} handleClose={handleClose}>
        {snackbarMessage}
      </MySnackbar>
    </Form>
  );
};

MyForm.propTypes = {
  users: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default MyForm;
