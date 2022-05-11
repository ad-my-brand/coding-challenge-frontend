import { fromLonLat } from 'ol/proj'
import React, { useEffect, useRef, useState } from 'react'
import { layer, custom, Map, Layers } from "react-openlayers"

const MapComp = ({lat, lng}) => {
    return (
        <div className='Map'>
            <Map view={{ center: fromLonLat([lng, lat]), zoom: 10 }}>
                <Layers>
                    <layer.Tile />
                </Layers>
            </Map>
        </div>

    )
}

export default MapComp