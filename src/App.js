import React, { useState, useEffect } from "react";
import "./App.css";
import FormControl from "./components/FormControl/FormControl";
import Map from "./components/Map/Map";

const App = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLat(latitude);
        setLng(longitude);
      }
    );
  }, []);

  return (
    <div className="App">
      <FormControl
        focus={focus}
        setFocus={setFocus}
        setLat={setLat}
        setLng={setLng}
      />
      <Map lat={lat} lng={lng} />
    </div>
  );
};

export default App;
