import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "../styles/Form.css"




const Map = ({ position, city }) => {
    return (
        <MapContainer className='map-div' center={position ? position : [22.2604, 84.8536]} zoom={9}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position ? position : [22.2604, 84.8536]} >
                <Popup>{city}</Popup>
            </Marker>

        </MapContainer>
        )
}

export default Map