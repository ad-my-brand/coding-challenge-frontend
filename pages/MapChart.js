import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const MapChart = ({geo}) => {
console.log(geo);
    const markers = [
        {
          markerOffset: -10,
          name: geo.name,
          coordinates: [geo.address.geo.lat,geo.address.geo.lng]
        }
      
      ];
      

  return (
    <ComposableMap
  style={{"backgroundColor": "lightblue"}}
    >
        <ZoomableGroup zoom={1.2}>
        <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "white" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      </ZoomableGroup>
      
    </ComposableMap>
  );
};

export default MapChart;
