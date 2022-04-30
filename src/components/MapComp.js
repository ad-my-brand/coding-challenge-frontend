import { fromLonLat } from 'ol/proj'
import React, { useState } from 'react'
import { layer, Map, Layers } from "react-openlayers"

const MapComp = () => {

    return (
        <div className='Map'>
            <Map view={{ center: fromLonLat([88.34, 22.67]), zoom: 10 }}>
                <Layers>
                    <layer.Tile />
                </Layers>
            </Map>
        </div>

    )
}

export default MapComp