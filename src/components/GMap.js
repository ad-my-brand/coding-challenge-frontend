import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "30rem",
  height: "30rem",
};

function MyComponent({ singleUserData }) {
 

  const center = {
    lat: singleUserData
      ? parseFloat(singleUserData?.address?.geo.lat)
      : 28.70406,
    lng: singleUserData
      ? parseFloat(singleUserData?.address?.geo.lng)
      : 77.102493,
    userCity: singleUserData?.address?.city,
    userStreet: singleUserData?.address?.street,
    userZipCode: singleUserData?.address?.zipcode,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD-ytDVuR2gR7W9rMHgYdqEJ0ypqQWQAP0",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
