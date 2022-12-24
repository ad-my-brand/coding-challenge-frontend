import React from "react";
import { GoogleMap,LoadScript,Marker, InfoWindow } from "@react-google-maps/api";

import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import App from "./App";
import "./App.css"

const mapStyles = {
    height:"400px",
    margin:"5px"
};


const maps=(props)=> {
    
    const location = {
        // address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat:Number(props.location[0].lat),
        lng: Number(props.location[0].lng),
    }
    const onLoad = map => {
        const bound = new window.google.maps.LatLngBounds()
        bound.extend(location)
        map.fitBounds(bound)
      }
    return (
        
       
        <GoogleMap mapContainerStyle={mapStyles} center={location} zoom={0} onLoad={onLoad}>
           <Marker  position={{lat:Number(props.location[0].lat),lng:Number(props.location[0].lng)}}     />
        </GoogleMap>
        
       
        
    )
}
export default maps