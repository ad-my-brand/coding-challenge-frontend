import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import { useEffect } from "react";

export const Maps = ({ new_location }) => {
    let [location, setLocation] = useState({});
    useEffect(() => {
        setLocation(new_location);
    }, [new_location]);
    const zoomLevel = 14;
    const pinTextStyles = {
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "2px",
    };
    const LocationPin = ({ text }) => (
        <div className="pin">
            <Icon icon={locationIcon} className="pin-icon" />
            <p className="pin-text" style={pinTextStyles}>
                {text}
            </p>
        </div>
    );
    return (
        <>
            <div className="map my-5 mx-5 d-flex justify-content-center">
                <div className="google-map">
                    <h3 className="map-h2">User Location</h3>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: "AIzaSyCTenzy_cGtzfdyxVx_JuWiGyzCJ-BD48A",
                        }}
                        defaultCenter={location}
                        defaultZoom={zoomLevel}
                    >
                        <LocationPin
                            lat={location.lat}
                            lng={location.lng}
                            text={location.address}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </>
    );
};
