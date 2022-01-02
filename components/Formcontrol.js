import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";

const UsersLocation = ({ lat, lng }) => (
  <div
    style={{
      width: 40,
      height: 40,
      backgroundColor: "green",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div>{`${lat.toFixed(0)} , ${lng.toFixed(0)}`}</div>
  </div>
);

export default function Formcontrol({
  label = "",
  handleValidation = () => {},
}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  let geo = {};
  if (selectedUser && selectedUser.hasOwnProperty("address")) {
    geo = {
      lat: Number(selectedUser.address.geo.lat),
      lng: Number(selectedUser.address.geo.lng),
    };
  }
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const resOk = res && res.ok;
      if (resOk) {
        const data = await res.json();
        setUsers(data);
      } else {
        throw new Error("Oops! something went wrong.");
      }
    } catch (err) {
      console.log("Error during API Request", err);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (err) setErr("");
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    if (err) setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://jsonplaceholder.typicode.com/posts";
    const options = {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        id: selectedUser.id,
      }),
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(url, options);
      const resOk = res && res.ok;
      if (resOk) {
        const data = await res.json();
        console.log("Response from post request", data);
        // clearing the text fields
        setTitle("");
        setBody("");
        setIsSubmitting(false);
        setErr("");
      } else {
        throw new Error("Oops! something went wrong while posting data.");
      }
    } catch (err) {
      console.log("Error during Post Request", err);
      setErr(err.message);
      setIsSubmitting(false);
    }
  };

  const handleSelectChange = (e, validationFunction) => {
    // avoid triggering validationFunc if text input is changed.
    if (e.target.type === "text") {
      return;
    }
    if (e.target.value === "Select") {
      setSelectedUser(null);
      return;
    }
    let item = JSON.parse(e.target.value);
    setSelectedUser(item);
    // generate validation error here
    if (item && Number(item.id) > 7) {
      validationFunction();
    }
  };

  return (
    <>
      <form
        onChange={(e) => handleSelectChange(e, handleValidation)}
        onSubmit={handleSubmit}
      >
        <label
          style={{ display: "block", fontWeight: "bold", fontSize: "40px" }}
        >
          {label}
        </label>
        <select style={{ width: "max-content", height: 40 }}>
          <option>Select</option>
          {users.length &&
            users.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
        {selectedUser === null ? (
          <div style={{ color: "red" }}>Please Select a User</div>
        ) : null}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            style={{ height: 40 }}
            required
          />
          <input
            type="text"
            name="body"
            placeholder="body"
            value={body}
            onChange={handleBodyChange}
            style={{ height: 40 }}
            required
          />
          <button>{isSubmitting ? "Submitting..." : "Submit"}</button>
        </div>
        <label style={{ color: "red" }}>{err && err}</label>
      </form>
      {Object.keys(geo).length ? (
        <div style={{ height: "50vh", width: "95%", marginTop: "8px" }}>
          <GoogleMapReact
            key={selectedUser && selectedUser.id}
            bootstrapURLKeys={{
              key: "AIzaSyBTQf4Es769K_1Yi1mr9EbjSRlM--KHIjo",
            }}
            defaultCenter={{
              lat: geo.lat,
              lng: geo.lng,
            }}
            defaultZoom={4}
          >
            <UsersLocation lat={geo.lat} lng={geo.lng} />
          </GoogleMapReact>
        </div>
      ) : null}
    </>
  );
}
