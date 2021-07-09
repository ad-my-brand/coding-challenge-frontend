import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
function Map() {
  const current = useSelector((state) => state.current);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: '500px',
    height: '500px',
    zoom: 0,
  });

  return (
    <div>
      <h1 className='text-danger'>Location :</h1>
      {Object.keys(current).length !== 0 ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken='pk.eyJ1IjoieXV2cjRqczFuZ2giLCJhIjoiY2txdjVuZDd6MGJieDJwbmx6bHk5cGFiZiJ9.uA7L_tZLm9TnMD4LlfdCoQ'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          <Marker
            latitude={parseFloat(current.latitiude)}
            longitude={parseFloat(current.longitude)}
          >
            <i className='fa fa-map-marker text-danger' aria-hidden='true'></i>
          </Marker>
        </ReactMapGL>
      ) : (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken='pk.eyJ1IjoieXV2cjRqczFuZ2giLCJhIjoiY2txdjVuZDd6MGJieDJwbmx6bHk5cGFiZiJ9.uA7L_tZLm9TnMD4LlfdCoQ'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        />
      )}
    </div>
  );
}

export default Map;
