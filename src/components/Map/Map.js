import React from 'react';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '250px',
  height: '250px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({ center, className }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBUw-2URsTTB02Dr_mttlrtsgz4O_Ah6yU",
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map</div>;

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={3}
        center={center}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
