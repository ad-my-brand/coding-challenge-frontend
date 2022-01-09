import React from "react";

import GoogleMapReact from "google-map-react";

const LocationLabel = (props) => (
  <i className="fas fa-thumbtack fa-2x" style={{ color: "#fff" }}>
    {props.children}
  </i>
);

const GoogleMap = (props) => {
  return (
    <GoogleMapReact
      style={{ width: "100%", height: "100%" }}
      bootstrapURLKeys={{
        key: "AIzaSyDJ45qlhyPJGjBf8IfiFNYn9LcoDi52mdQ",
      }}
      defaultCenter={props.center}
      defaultZoom={4}
    >
      <LocationLabel>{props.city}</LocationLabel>
    </GoogleMapReact>
  );
};

export default GoogleMap;
