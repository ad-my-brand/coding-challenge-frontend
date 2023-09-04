import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet';

const UserMap = ({ location }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null); // Reference to the Leaflet map instance

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

    // Add CSS styles for the map container
    const mapStyle = {
        height: '300px',
        width: '65%',
        margin: '0 auto', // Center horizontally
        borderRadius: '8px', // Apply curved border
        boxShadow: '3px 3px 10px black', // Add shadow

    };

    return <div ref={mapContainer} style={mapStyle}></div>;
};

export default UserMap;
