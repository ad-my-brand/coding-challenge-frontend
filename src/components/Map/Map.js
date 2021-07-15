import React from 'react';

import classes from './Map.module.css';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({ center, className }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map</div>;

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={4}
        center={center}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
