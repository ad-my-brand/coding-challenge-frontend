import React from 'react';
import { Map, Marker } from 'pigeon-maps';

const Location = ({ center }) => {
  return (
    <Map height={300} center={center} defaultZoom={11}>
      <Marker width={50} anchor={center} />
    </Map>
  );
};

export default Location;
