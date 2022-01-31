import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "./map.css";
import MAPTILER_API_KEY from "../mapTilerkey";

function Map({ maplng, maplat }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [zoom] = useState(14);
  const [API_KEY] = useState(MAPTILER_API_KEY);

  useEffect(() => {
    // if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [maplng, maplat],
      zoom: zoom,
      localIdeographFontFamily: null,
    });
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([maplng, maplat])
      .addTo(map.current);
  }, [maplat, maplng]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;
