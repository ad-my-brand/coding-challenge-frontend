import { MapContainer, TileLayer, Marker, Popup , useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const Map = ({cord}) => {
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={1}
      scrollWheelZoom={true}
      style={{width: '100%',height: '400px'}}
    >
        <TileLayer
      attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
      <Marker position={cord} draggable={false} animate={true} >
        <Popup >Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
