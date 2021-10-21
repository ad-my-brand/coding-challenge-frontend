import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';

const Map = ReactMapboxGl({
  accessToken:
  'pk.eyJ1Ijoic2FtYXJ0aDEyMyIsImEiOiJja3V6ZjdpbTMyeWN6MnVxdnV3d2Nra2JmIn0.n46PfiRtN9x4v94miCeMIw'
});

const Mapbox = ({center}) => {
  const [geoLoc, setGeoLoc] = useState(center)
  useEffect(() => setGeoLoc(center), [center])
  return(
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      zoom={[2]}
      center={geoLoc} 
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={geoLoc}/>
      </Layer>
    </Map>
  )
}

export default Mapbox