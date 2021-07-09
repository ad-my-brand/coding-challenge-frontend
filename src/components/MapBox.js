import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MapBox = ({ selectedUser }) => {
  const [map, setMap] = useState({
    width: '500px',
    height: '500px',
    zoom: 0,
  });

  return (
    <div className='border bg-secondary p-5 rounded'>
      <ReactMapGL
        className='rounded'
        {...map}
        mapboxApiAccessToken='pk.eyJ1IjoiYWthc2hjb29sMjAxNCIsImEiOiJja25wandzZjIxcHVvMm9ueDhrYTdteW9nIn0.NYLhcZT82ddE-5hg7Bk7JA'
        mapStyle='mapbox://styles/mapbox/navigation-day-v1'
        center={selectedUser.lat && [selectedUser.lat, selectedUser.lng]}
        onViewportChange={(map) => {
          setMap(map);
        }}
      >
        {selectedUser.lat && (
          <Marker latitude={selectedUser.lat} longitude={selectedUser.lng}>
            <i className='fa fa-map-marker text-success'></i>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;
