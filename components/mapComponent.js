import React from 'react'
import {GoogleMap,useLoadScript,Maker,InfoWindow} from '@react-google-maps/api';
import usePlacesAutocomplete ,{getGeocode,getLatLng} from 'use-places-autocomplete'

const mapComponent = ({name, coordinates,filter}) => {

const mapContainerStyle ={width:'100vw', height:'100vh'}
  
  
  const {isLoaded,loadError}= useLoadScript({
    googleMapsApiKey:'AIzaSyBya0fMRC8WFiJaE2wZjK_2xFdaU15zZgk',
  })

  if(loadError) return "Error Loading Map"
  if(!isLoaded) return "Loading Maps"
  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={filter}></GoogleMap>
    </div>
  )
}

export default mapComponent