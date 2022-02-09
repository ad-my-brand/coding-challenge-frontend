import React, { useState, useEffect } from "react";
import "./Formcontrol.css";
import Map from "./Map";
import { NotificationManager } from "react-notifications";

const Formcontrol = () => {
  const initialValues = { title: "", body: "", userId: "" };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [users, setusers] = useState([]);
  const [userGeo, setuserGeo] = useState({});
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    // console.log(formValues);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    const { lng, lat } = users[value - 1].address.geo;
    setuserGeo({ lng: parseFloat(lng), lat: parseFloat(lat) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  // Get Users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setusers(data);
      });
  }, []);
  //POST Request
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => {
          NotificationManager.success("Request Succeed");
          // console.log(res);
          setIsSubmit(false);
        })
        .catch((err) => {
          NotificationManager.error("Error", err.message);
          // console.log(err);
        });

      setFormValues(initialValues);
    } else {
      // console.log("zab");
      setIsSubmit(false);
    }
  }, [isSubmit]);
  //Validation Function
  const validate = (values) => {
    const errors = {};
    if (!values.userId) {
      errors.userId = "Please Select a User!";
    }
    if (!values.title) {
      errors.title = "Title is required!";
    }

    if (!values.body) {
      errors.body = "Body is required!";
    }

    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <h2>Form Contol</h2>
          <select
            name="userId"
            value={formValues.userId}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="">Select User</option>
            {users.map((u, id) => (
              <option key={id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <p> {formErrors.userId}</p>
          <label>Title</label>
          <input
            name="title"
            value={formValues.title}
            onChange={(e) => handleChange(e)}
            type="text"
          />
          <p> {formErrors.title}</p>
          <label>Body</label>
          <input
            name="body"
            value={formValues.body}
            onChange={(e) => handleChange(e)}
            type="text"
          />
          <p> {formErrors.body}</p>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="map-container">
        <Map userGeo={userGeo} />
      </div>
    </div>
  );
};

export default Formcontrol;
