import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./mapcontainer.css";

const MapContainer = ({ cordinates }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={10} center={cordinates} mapContainerClassName="map">
      <Marker position={cordinates} />
    </GoogleMap>
  );
};

export default MapContainer;
