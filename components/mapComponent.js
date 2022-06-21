import React from 'react'
import GoogleMapReact from 'google-map-react';


const mapComponent = ({name,coorinates}) => {

    console.log(name);
  return (
    <div>
      <GoogleMapReact bootstrapURLKeys ={{key:'AIzaSyBNWhk13OpDc6HicOmilxsLVKGREi0bgio'}}
        defaultCenter={coorinates}
        center={coorinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        option=''
        onChange={()=>{}}
        onChildClick={()=>{}}
      ></GoogleMapReact>
    </div>
  )
}

export default mapComponent