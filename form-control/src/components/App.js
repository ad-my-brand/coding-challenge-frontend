import React, { useRef,useState,useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import FormControl from './FormControl';
import "../styles/app.css";

export default function App(){

    const mapElement = useRef();
    const [map, setMap] = useState({});
    
    useEffect(() => {
       let map = tt.map({
        key: process.env.REACT_APP_TOMTOM_API_KEY,
        container: mapElement.current,
        center: [77.216721,28.644800],
        zoom: 13
       });
       setMap(map);
       return () => map.remove();
    },[]);
    
    // function clickFunc(){
    //    map.flyTo({
    //     center: [-121.91599,37.36765]
    //    })
    // }
     
    function setCenterToDefault(){
      map.flyTo({
        center: [77.216721,28.644800]
       })
    }

    function centerMap(evt){
       const lng = Number(evt.target.getAttribute("lng"));
       const lat = Number(evt.target.getAttribute("lat"));
       map.flyTo({
        center: [lng,lat]
       })
    }

    return (
      <div className='appDiv'>
        <div className='contentDiv'>
          <FormControl changeMapCenter = {centerMap} setCenter = {setCenterToDefault} />
          <div ref={mapElement} className="mapDiv"></div>
        </div>
      </div>
    )
}