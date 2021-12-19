import React from 'react';
import ReactMap from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const accessToken = "pk.eyJ1Ijoia3NoaXRpenByYXRhcCIsImEiOiJja3hieDgyYzQxMjlhMnZrdG1tNzkwNjE0In0.vIYAYPMRzYVHgKYOskl6FQ";
const style = "mapbox://styles/mapbox/streets-v11";

const Map = ReactMap({
  accessToken
});

const mapStyle = {
  height: '100%',
  width: '36vw',

};

function MapAPI(props){

  let viewport = {
    center : [0, 20],
    zoom : [4]
  }

  if(props.user.address !== undefined){
    viewport = {
      center : [props.user.address.geo.lng, props.user.address.geo.lat],
      zoom : [8]
    }
  }

    return(
      <Map
      style={style}
      containerStyle={mapStyle}
      {...viewport}
      />
    )
  }

export default MapAPI;