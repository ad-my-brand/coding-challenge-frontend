import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript,MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};


const Map = (props:{
    posts:{id:string,address : {geo:{lat:string,lng:string}}}[]
}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||""
    })
    const center = {
        lat: parseFloat(props.posts[1].address.geo.lat),
        lng: parseFloat(props.posts[1].address.geo.lng)
    };
    return (
        <>
        {(!isLoaded)?(<div>Loading...</div>):(
            <div>
                <GoogleMap
                    zoom={1}
                    center={center}
                    mapContainerStyle={containerStyle}
                >
                    {props.posts.map((element)=>{
                        return(<MarkerF 
                            key={element.id} 
                            position={{
                                lat:parseFloat(element.address.geo.lat),
                                lng:parseFloat(element.address.geo.lng)
                            }}>
                        </MarkerF>) 
                    })}
                </GoogleMap>
            </div>
            
        )}
        </>
    )
}
export default Map