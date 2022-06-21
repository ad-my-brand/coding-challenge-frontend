import React from 'react'
import {GoogleMap,useLoadScript,Maker,InfoWindow} from '@react-google-maps/api';
import usePlacesAutocomplete ,{getGeocode,getLatLng} from 'use-places-autocomplete'

const mapComponent = ({name,coorinates}) => {

const libraries=["places"]
const mapContainerStyle ={width:'100vw', height:'100vh'}
const center=
  {
    lat:0,
    lng:0
}

  const {isLoaded,loadError}= useLoadScript({
    googleMapsApiKey:'AIzaSyBya0fMRC8WFiJaE2wZjK_2xFdaU15zZgk',
    libraries
  })

  if(loadError) return "Error Loading Map"
  if(!isLoaded) return "Loading Maps"

    console.log(name);
  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}></GoogleMap>
    </div>
  )
}

export default mapComponent