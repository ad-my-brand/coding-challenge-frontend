import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent({ userGeo }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDq6aPDB9efhl_gWTdTtgdoJToOGgz9aOg",
  });

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={Object.keys(userGeo) != 0 ? userGeo : center}
      zoom={2}
      id="map"
    >
      <Marker position={userGeo} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
