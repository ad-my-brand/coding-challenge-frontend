import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapTiler } from "./mapValues";
import { Map } from "leaflet";
import type { UserData } from "../../types";

type MapProps = {
  selectedUser: UserData | null;
};

const MapComponent = ({ selectedUser }: MapProps) => {
  const [city, setCity] = useState<string>("");
  const [center, setCenter] = useState({ lat: 28.6448, lng: 77.216721 });
  const mapRef = useRef<Map>(null);
  const ZOOM_LEVEL = 12;

  useEffect(() => {
    if (selectedUser) {
      const userGeo = selectedUser.address.geo;
      const position = { lat: Number(userGeo.lat), lng: Number(userGeo.lng) };
      setCenter(position);
      setCity(selectedUser.address.city);

      console.log(selectedUser);

      if (mapRef && mapRef.current) {
        mapRef.current.setView(position, ZOOM_LEVEL);
      }
    }
  }, [selectedUser]);

  return (
    <section className="w-full lg:w-2/3 flex flex-col">
      {selectedUser?.name && (
        <h2 className="text-xl font-medium text-center">
          {selectedUser.name} lives in {city}.
        </h2>
      )}
      <MapContainer
        className="relative w-full h-80 mt-4 lg:h-[30rem] rounded-md border border-black z-0"
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer
          url={mapTiler.url}
          attribution={mapTiler.attribution}
          className="relative z-0"
        />
        {city && (
          <Marker position={[center.lat, center.lng]}>
            <Popup>{city}</Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
};

export default MapComponent;
