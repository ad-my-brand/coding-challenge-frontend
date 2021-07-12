import React from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";

const Map = ({ center, zoom }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCcbEd6cPWxxcNiUCqbtQmD1Y18tux6tj0" }}
        center={center}
        defaultZoom={zoom}>
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 28.624387384896497,
    lng: 77.03643491239914,
  },
  zoom: 4,
};

export default Map;
