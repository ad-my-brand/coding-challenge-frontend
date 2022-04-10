import React from "react";
import { MapContainer, TileLayer, Tooltip, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ cord }) {
  return (
    <MapContainer
      center={cord}
      zoom={4}
      className="map"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={cord}
        pathOptions={{ fillColor: "green"}}
        radius={100000}
        stroke={true}
      >
        <Tooltip>User Location</Tooltip>
      </Circle>
    </MapContainer>
  );
}
