import React from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import { LocationPin } from "./LocationPin";

const Map = ({ location }) => {
  const { lat, lng } = location;
  console.log(lat, lng);
  return (
    <div className="google-map">
      {lat && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          center={[lat, lng]}
          defaultZoom={0}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default Map;
