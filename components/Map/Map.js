import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import style from '../../styles/Home.module.css'
import { useEffect } from "react";


const Map = ({ userLocation }) => {

    const [lat, lng] = userLocation

    const RecenterAutomatically = ({ lat, lng }) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng]);
        return null;
    }

    return (
        <div>
            <MapContainer className={style.map} center={[lat, lng]} zoom={5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterAutomatically lat={lat} lng={lng} />
            </MapContainer>
        </div>
    );
};

export default Map;