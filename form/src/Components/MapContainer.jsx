import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"

export function MapContainer({address}) {
    const [location, setLocation] = useState({
        lat:0,lng:0
    })
    // const [locat, setlocat] = useState({})
    useEffect(() => {
        if(address){
    
            const loc = address.geo
            // console.log(loc);
            setLocation(loc)
            // getLocation()
        }
    }, [address])
    

  return (
    <Map height={250} width={300} defaultCenter={[parseFloat(location.lng),parseFloat(location.lat)]} defaultZoom={0}>
      <Marker width={50} anchor={[parseFloat(location.lng),parseFloat(location.lat)]} />
      {/* {locat} */}
    </Map>
  )
}

