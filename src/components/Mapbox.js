import React, { useState, useEffect } from "react";
import MapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
const Mapbox = ({ coordinates }) => {
  const [lat, setLat] = useState(coordinates.lat);
  const [lng, setLng] = useState(coordinates.lng);

  useEffect(() => {
    setLat(coordinates.lat);
    setLng(coordinates.lng);
  }, [coordinates]);
  return (
    <div className="ui container" style={{ marginTop: "20px" }}>
      {lat && lng && (
        <MapGL
          width={"100%"}
          height={500}
          latitude={parseInt(lat)}
          longitude={parseInt(lng)}
          zoom={2}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOXTOKEN}
          mapStyle={"mapbox://styles/mapbox/streets-v9"}
        >
          <Marker latitude={parseInt(lat)} longitude={parseInt(lng)}>
            <FaMapMarkerAlt className="marker" />
          </Marker>
        </MapGL>
      )}
    </div>
  );
};

export default Mapbox;
