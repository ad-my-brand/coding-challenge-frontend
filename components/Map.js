import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

class Map extends Component {
  render = () => {
    const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;
    const containerStyle = {
      width: "400px",
      height: "400px",
    };

    const center = {
      lat: -3.745,
      lng: -38.523,
    };
    return (
      <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <></>
        </GoogleMap>
      </LoadScript>
    );
  };
}

export default Map;
