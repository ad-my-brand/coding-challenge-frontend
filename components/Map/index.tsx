import Script from 'next/script';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xpZW50MzMiLCJhIjoiY2txdnVleTFsMGk0MzJ2cWE5bmx4Y2U1dSJ9._2T3EVUaV_9g--x_lF0pww';

interface MapProps {
  geo: {lat: string, lng: string};
}

export const Map: React.FC<MapProps> = ({geo}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    setLng(Number(geo.lng));
    setLat(Number(geo.lat));
  }, [geo]);

  useEffect(() => {
    if(!mapContainer.current) return;
    // if (!map.current) return;
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current)
    }, [lat, lng, zoom]);

  return (
    <div ref={mapContainer} className='map'> 
      <Script src='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js'></Script>
    </div>
  )
}