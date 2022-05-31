import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
const FormControl = () => {
  const [data, setdata] = useState([]);
  const [formValues, setformValues] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const [formstyle, setformstyle] = useState({
    userId: {
      border: "3px solid red",
    },
    title: {
      border: "3px solid red",
    },
    body: {
      border: "3px solid red",
    },
  });
  const [formErrors, setformErrors] = useState({});
  const [responsemsg, setresponsemsg] = useState("");
  const handleChange = (e) => {
    if (e.target.value != 0 && e.target.value != "") {
      setformstyle({
        ...formstyle,
        [e.target.name]: {
          border: "3px solid green",
        },
      });
    } else {
      setformstyle({
        ...formstyle,
        [e.target.name]: {
          border: "3px solid red",
        },
      });
    }
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const field = {
    width: "250px",
    padding: "5px",
    margin: "10px",
  };
  const formfield = {
    width: "500px",
    padding: "25px",
    margin: "10px",
  };

  useEffect(() => {
    getData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    if (formValues.userId && formValues.title && formValues.body) {
      const req = JSON.stringify(formValues);
      await axios
        .post("https://jsonplaceholder.typicode.com/posts", req)
        .then((res) => {
          setresponsemsg("Data posted successfully");
          alert("Data posted successfully");
        })
        .catch((err) => {
          setresponsemsg(err);
          alert(err);
        });
    } else {
      console.log("error found");
    }
  };

  const validate = (val) => {
    const errors = {};

    if (!val.userId) {
      errors.userId = "Please select a user";
    }
    if (!val.title) {
      errors.title = "Title is required";
    }
    if (!val.body) {
      errors.body = "Body is required";
    }
    return errors;
  };

  return (
    <center>
      <div style={{ "background-color": "#d9dce4" }}>
        <div
          style={{
            "background-color": "#7996e0",
            width: "fit-content",
            paddingBottom: "5px",
          }}
        >
          <fieldset style={formfield}>
            <legend>Form</legend>
            <form onSubmit={handleSubmit}>
              <fieldset style={field}>
                <legend>
                  User:<span color="red">*</span>
                </legend>

                <select
                  id="userid"
                  style={formstyle.userId}
                  name="userId"
                  onChange={handleChange}
                >
                  <option value={0} key={0}>
                    ---Select User---
                  </option>
                  {data.map((e) => {
                    return (
                      <option value={e.id} key={e.id}>
                        {e.name}-{e.id}
                      </option>
                    );
                  })}
                </select>
                <p id="selectError">{formErrors.userId}</p>
              </fieldset>
              <fieldset style={field}>
                <legend>
                  Title<span>*</span>
                </legend>
                <input
                  type="text"
                  style={formstyle.title}
                  id="Title"
                  name="title"
                  placeholder="Enter the user name"
                  onChange={handleChange}
                />
                <p id="nameError">{formErrors.title}</p>
              </fieldset>
              <fieldset style={field}>
                <legend>
                  Body<span>*</span>
                </legend>
                <input
                  type="text"
                  name="body"
                  style={formstyle.body}
                  id="Body"
                  placeholder="Enter the body value"
                  onChange={handleChange}
                />
                <p id="bodyError">{formErrors.body}</p>
              </fieldset>
              <button type="submit">Submit</button>
            </form>
          </fieldset>
        </div>
        <div>
          {responsemsg ? (
            <div>
              <p>{responsemsg}</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div>
          <Map />
        </div>
      </div>
    </center>
  );
};
export default FormControl;
