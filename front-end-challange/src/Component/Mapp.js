import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    height: '400px',
    width: '40%',
    margin: '0 auto'
};



const Mapp = ({ user }) => {

    const { geo } = user;
    let lat = parseInt(geo.lat);
    let lng = parseInt(geo.lng);
    const center = {
        lat: lat,
        lng: lng
    };
    return (
        <LoadScript
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