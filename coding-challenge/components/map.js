import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import ChangeView from './changeView';
import 'leaflet/dist/leaflet.css'

const style = {
    margin: "0 auto",
    width: "75%",
    borderRadius: 10,
    height: 400
}

const Map = ({ location }) => {

    return (
        <MapContainer center={location} zoom={5} scrollWheelZoom={false} style={style}>
            <ChangeView center={location} zoom={5} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}>
                <Popup>
                    You are here!
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map