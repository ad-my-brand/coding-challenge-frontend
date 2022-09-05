import "./App.css";
import FormControl from "./FormControl";
import Header from "./Header";
import * as axios from "axios";
import React, { useEffect, useState } from "react";
import {Button} from 'reactstrap';
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from "./Map.css"


function App() {
  const [usersData, setUsersData] = useState([]);
  const [showForm, setShowForm] = useState(null);
  
  const getUsersApiKey = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(getUsersApiKey).then((res) => {
      console.log(res.data);
      setUsersData(res.data);
    });
  }, []);

  function handleFormControl() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(null);
  }

  return (
    <div>
      <Header />
      
      {usersData.map((user) => {
        return (
          <div key={user.id} className="user">
            {showForm && <FormControl id={user.id} closeForm={closeForm} />}
            <div className="holder">
              <div className="list">
                <div className="userName">
                  <h2>Name: {user.name}</h2>
                </div>
                <div className="userAddress">
                  <h2>
                    Address:{" "}
                    <a
                      href={`https://www.google.co.in/maps/place/${user.address.city}`}
                      target="__blank"
                    >
                      {" "}
                      {user.address.suite} -{user.address.street} -{" "}
                      {user.address.city} - {user.address.zipcode}
                    </a>
                    <div>
                      <Button color="dark"  onClick={() => handleFormControl(user.id)}>
                        Add User Validation
                      </Button>
                    </div>
                  </h2>
                </div>
                <div className={styles.map}>
                <ReactMapGL
      style={{ height: "25rem", width: "42rem", borderRadius: "0.6rem", scale: "1.5rem" }}
      zoom={5}
      attributionControl={false}
      latitude={user.address.geo.lat}
      longitude={user.address.geo.lng}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken= "pk.eyJ1IjoiYWhtYWQwMDEiLCJhIjoiY2wxbml5OWhxMHVwdDNjbzNsMHV0djNvYiJ9.ubLi-2-V7U7-kecNH_kPEw"
    />
              </div>
              </div>
            </div> 
          </div>
        );
      })}
    </div>
  );
}

export default App;