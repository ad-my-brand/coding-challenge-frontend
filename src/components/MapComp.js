// import { Feature } from 'ol'
// import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
// import { Vector } from 'ol/source';
import React, { useEffect, useRef, useState } from 'react'
import { layer, custom, Map, Layers } from "react-openlayers"

const MapComp = ({lat, lng}) => {
    // var iconFeature = new Feature(new Point([0, 0]));
    // const source = new Vector({features: [iconFeature]});
    // const marker = new custom.style.MarkerStyle(
    //     'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
    //   );

    // useEffect(() => {
    //   console.log(lng)
    

    // })
    

    return (
        <div className='Map'>
            <Map view={{ center: fromLonLat([lng, lat]), zoom: 10 }}>
                <Layers>
                    <layer.Tile />
                    {/* <layer.Vector source={source} style={marker.style} zIndex="1" /> */}
                </Layers>
            </Map>
        </div>

    )
}

export default MapComp