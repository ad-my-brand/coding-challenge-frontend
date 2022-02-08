import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "./style.css";

const Map = ({ lat, lng }) => {
  if (lng <= -90) lng = 50;
  const mapContainer = useRef(null);
  const map = useRef(null);

  const API_KEY = "adU6zwZDuO7QmBwpjiGv";

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      //   style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}#1.0/0.00000/0.00000`,
      center: [lat, lng],
      // zoom: 4,
      localIdeographFontFamily: null,
    });
    // console.log(map.current)

    new maplibregl.Marker({ color: "#ff0000" })
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, [lat]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
