import React from "react";
import { MdLocationOn } from "react-icons/md";

const LocationMarker = ({ lat, lng, handleMarker }) => {
  return (
    <div className="location-marker" onClick={handleMarker}>
      <MdLocationOn className="marker" />
    </div>
  );
};

export default LocationMarker;
