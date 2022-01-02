import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
const MapContainer = ({ address }) => {
    //   console.log(address);

    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    useEffect(() => {
        if (address) {
            const loc = address.geo;
            // JSON.stringify(loc)
            setLocation(loc);
            console.log(parseFloat(location.lat));
        }
    }, [address]);
    const mapStyles = {
        height: "20vh",
        width: "100%",
    };

    const defaultCenter = {
        lat: location ? parseFloat(location.lat) : 0,
        lng: location ? parseFloat(location.lng) : 0,
    };

    return (
        <LoadScript googleMapsApiKey=''>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            />
        </LoadScript>
    );
};

export default MapContainer;
