import { Map , Marker } from "google-maps-react";
import { GoogleApiWrapper } from "google-maps-react";
import { useState } from "react";
 function CustomMap({ google, coordinates }) {
        console.log("google map")
     console.log(coordinates)
    return (
        <>
        <Map 
            style={{marginLeft:"20px",marginTop:"10px",width:"50vw",height:"70vh"}}
            google={google}
            zoom={8}
            center={coordinates}
            initialCenter={coordinates}
            disableDefaultUI={true}
            className="Map"
        >
        <Marker position={coordinates} />
        </Map>
        </>
    )
};

console.log()
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(CustomMap);