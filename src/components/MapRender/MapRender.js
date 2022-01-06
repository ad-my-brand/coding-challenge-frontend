import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./MapRender.css";
import L from "leaflet";
import { useEffect } from "react/cjs/react.development";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ position }) => {
  const map = useMap();

  map.flyTo(position, map.getZoom());

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup></Popup>
      </Marker>
    </>
  );
};

const MapRender = (props) => {
  const position = [props.lat, props.lng];

  return (
    <MapContainer
      className="mapContainer"
      center={position}
      zoom={3}
      scrollWheelZoom={false}
    >
      <MapComponent position={position} />
    </MapContainer>
  );
};

export default MapRender;
