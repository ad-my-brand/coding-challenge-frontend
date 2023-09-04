import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";


function SetViewOnClick({ position }) {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
}

const customIcon = new Icon({
    iconUrl: require("marker-icon.png"),
    iconSize: [38, 38]
});

const Map = ({ position, city }) => {
    return (
        <MapContainer className='h-[20rem] md:h-[22rem] xl:h-[25rem] w-[22rem] md:w-[42rem] xl:w-[55rem] rounded-xl z-0 border border-black' center={position ? position : [12.971599, 77.594566]} zoom={6}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && (
                <Marker position={position} icon={customIcon} >
                    <Popup>{city}</Popup>
                </Marker>
            )}
            <SetViewOnClick position={position ? position : [12.971599, 77.594566]} />
        </MapContainer>)
}

export default Map