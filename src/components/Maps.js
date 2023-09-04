import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EmbeddedMap = ({ latitude, longitude }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API}>
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default EmbeddedMap;
