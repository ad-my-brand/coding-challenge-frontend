import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = ({ location }) => {
    return (
        <MapContainer
            center={location}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && (
                <Marker position={location}>
                    <Popup>User's Location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default LeafletMap;
