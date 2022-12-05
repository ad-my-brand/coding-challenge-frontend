import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router-dom';
import './LocationMap.css';

const LocationMap = () => {
    const data = useLoaderData();
    const address = data.address;
    const lat = address.geo.lat;
    const lng = address.geo.lng;
    return (
        <div className=''>
            <MapContainer className='map' center={[lat, lng]} zoom={4} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        {
                            address?.suite + ", " + address?.street + ", " + address?.city
                        }
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default LocationMap;