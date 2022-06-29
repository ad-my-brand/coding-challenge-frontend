import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = (props) => {
  const [position, setPosition] = useState([0, 0]);

  const { lat, lng } = props;
  useEffect(() => {
    if ((lat, lng)) {
      const location = [lat, lng];
      setPosition(location.splice(0, position.length, ...position));
    }
  }, [lat, lng]);

  let greenIcon = L.icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Font_Awesome_5_solid_map-marker-alt.svg",

    shadowUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Font_Awesome_5_solid_map-marker-alt.svg",
    iconSize: [20, 30],
    shadowSize: [20, 30],
  });

  return (
    <Box>
      {lat && lng ? (
        <MapContainer
          center={position}
          zoom={0}
          style={{ width: "100%", height: "200px", overflow: "hidden" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={greenIcon} />
        </MapContainer>
      ) : (
        <Text>Please Select A User</Text>
      )}
    </Box>
  );
};

export default MapComponent;

const Box = styled.div`
  min-height: 200px;
  border: solid #8b8a8b 2px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;
const Text = styled.p`
  font-size: 1.5em;
`;
