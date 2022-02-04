// import { useState } from "react"
const Map = ({lat,lng}) => {
    return(
        <Map google={}
            zoom={14}
            style={{
                width:'100%',
                height:'100%'
            }}
            initialCenter={
                {
                    lat,
                    lng
                }
            }
        />
    )
}
