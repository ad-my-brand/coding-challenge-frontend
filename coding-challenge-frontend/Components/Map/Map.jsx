import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";
const Map = () => {
  const { position, Address } = useStateContext();

  useEffect(() => {
    if (position[0] === 28.7041) {
      return;
    }
    toast.success(`Position changed to ${Address?.city}  ✈`);
  }, [position]);

  return (
    <MapContainer
      center={position}
      zoom={1}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position[0] !== 28.7041 && (
        <Marker position={position}>
          <Popup>A pretty CSS3 popup.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
