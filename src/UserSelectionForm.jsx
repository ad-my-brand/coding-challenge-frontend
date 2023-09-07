import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function UserSelectionForm() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch users from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      });
  }, []);

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    // Fetch the selected user's data to get their location (assuming a field called 'address' with 'geo' coordinates)
    const selectedUserData = users.find((user) => user.id === parseInt(userId));

    if (
      selectedUserData &&
      selectedUserData.address &&
      selectedUserData.address.geo
    ) {
      const { lat, lng } = selectedUserData.address.geo;
      setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  };
  console.log(mapCenter)

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation here
    if (!selectedUser || !title || !body) {
      setError("Please fill in all fields");
      return;
    }

    // Create a new post
    const postData = {
      title,
      body,
      userId: selectedUser,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error creating post");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post created:", data);
        // Reset form fields
        setSelectedUser("");
        setTitle("");
        setBody("");
        setError("");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        setError("Error creating post. Please try again later.");
      });
  };
  console.log(users);
  console.log(body);
  console.log(title);
  console.log(selectedUser);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel id="demo-simple-select-label">Select a User</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUser}
              label="Select a User"
              onChange={handleUserChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            size="small"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Body"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        </div>
        <div>
          <Button
            sx={{ marginBottom: "1rem" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
        {error && <p>{error}</p>}
      </form>

      {/* Google Maps */}
      {/* <LoadScript googleMapsApiKey="AIzaSyBzclJZwbiD4B58SBznmYK9u0BPQSESOy4">
        <GoogleMap
          id="map"
          center={mapCenter}
          zoom={8}
          mapContainerStyle={{ width: '400px', height: '400px' }}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </LoadScript> */}
      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_API }}
          center={mapCenter}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={mapCenter.lat}
            lng={mapCenter.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default UserSelectionForm;
