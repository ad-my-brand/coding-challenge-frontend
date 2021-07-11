import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
function MapLoc() { 
    
  const [current,setCurrent] = useState({});

  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom:0,
    width: '400px',
    height: '600px',
    
  });

const mapboxApiAccessToken="pk.eyJ1IjoiZ292aW5kaGVyZW1hcCIsImEiOiJja3F5eWM2eG8xNThtMnducmQwM3hpc2ZuIn0.6NdodzHT2kzK5tw8vfzUrQ"
  return (
    <div>
      <h1 className='loct'>Location :</h1>
      {Object.keys(current).length !== 0 ? (
        <ReactMapGL
          {...viewport}
          
          mapboxApiAccessToken="pk.eyJ1IjoiZ292aW5kaGVyZW1hcCIsImEiOiJja3F5eWM2eG8xNThtMnducmQwM3hpc2ZuIn0.6NdodzHT2kzK5tw8vfzUrQ"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          
        >
          <Marker
            latitude={parseFloat(current.latitiude)}
            longitude={parseFloat(current.longitude)}
          >
            <i aria-hidden='true'></i>
          </Marker>
        </ReactMapGL>
      ) : (
        <ReactMapGL
          {...viewport}
         
          mapboxApiAccessToken="pk.eyJ1IjoiZ292aW5kaGVyZW1hcCIsImEiOiJja3F5eWM2eG8xNThtMnducmQwM3hpc2ZuIn0.6NdodzHT2kzK5tw8vfzUrQ"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          
        />
      )}
    </div>
  );
}

export default MapLoc;

