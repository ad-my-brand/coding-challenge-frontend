import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: 'full',
  height: '500px'
};



function Gmap({ user }) {
  const latS = user?.address?.geo?.lat;
  const lngS = user?.address?.geo?.lng;
  const lat = parseFloat(latS);
  const lng = parseFloat(lngS);
  let center = {
    lat: lat ? lat : 23.777176,
    lng: lng ? lng : 90.399452
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAHFn9nLVmNtiF-c9ZKnyGjZcTelk_68oY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  )
}

export default Gmap;

