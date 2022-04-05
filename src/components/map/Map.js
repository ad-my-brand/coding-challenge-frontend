import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F1cmF2c2VocmF3YXQiLCJhIjoiY2wxa2p0cXVtMDBybTNvbzY4bzBoYTRldiJ9.M4eVqu14gDrGQncZPiCqQA';




const MapCmp = ({lng, lat}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
      });


      return (
        <div>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat}
        </div>
        <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default MapCmp

