import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// map style
const containerStyle = {
    height: '400px',
    width: '40%',
    margin: '0 auto'
};


// getting map data from google map api
const Mapp = ({ user }) => {
    // set user address lat and lng
    const { geo } = user;
    let lat = parseInt(geo.lat);
    let lng = parseInt(geo.lng);
    const center = {
        lat: lat,
        lng: lng
    };
    return (
        <LoadScript
            // google api key
            googleMapsApiKey="AIzaSyCejVuI2J7QOKO7jmYhsoR24Wn5vddQQJY"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <></>
            </GoogleMap>
        </LoadScript>
    );
};

export default Mapp;