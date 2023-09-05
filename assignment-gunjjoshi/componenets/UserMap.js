import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UserMap = ({ location }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (location) {
            // Check if window is defined to ensure this code runs on the client-side
            if (typeof window !== 'undefined') {
                // Create a Leaflet map only on the client-side if it hasn't been initialized yet
                if (!mapRef.current) {
                    mapRef.current = L.map(mapContainer.current).setView([location.lat, location.lng], 3);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
                    L.marker([location.lat, location.lng]).addTo(mapRef.current);
                }
            }
        }
    }, [location]);


    const mapStyle = {
        height: '300px',
        width: '65%',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '3px 3px 10px black',

    };

    return <div ref={mapContainer} style={mapStyle}></div>;
};

export default UserMap;
