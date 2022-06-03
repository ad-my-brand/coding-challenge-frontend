import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ChangeMapView from './Map/ChangeMapView';

import UserContext from '../context/user';
import { useContext } from 'react';
import classes from '../styles/Map.module.scss';
import { DEFAULT_POSITION, MAP_ZOOM } from '../config';

const icon = L.icon({ iconUrl: '/images/marker-icon.png' });

const Map = () => {
  const {
    selectUser: { user },
  } = useContext(UserContext);

  let position = DEFAULT_POSITION;

  if (user) {
    const { lat, lng } = user.address.geo;
    position = [lat, lng];
  }

  return (
    <MapContainer
      center={position}
      className={classes.map}
      zoom={MAP_ZOOM}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <ChangeMapView coords={position} />

      <Marker position={position} icon={icon}></Marker>
    </MapContainer>
  );
};

export default Map;
