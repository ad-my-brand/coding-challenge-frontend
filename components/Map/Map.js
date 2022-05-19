import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapgl from "react-map-gl"
import classes from "./Map.module.css";

const Map = ({loc}) => {

  const zoom = 4;

  return (
    <div className={classes.Map}>
        <p className={classes.Map__location}>Longitude: {loc.lng} | Latitude: {loc.lat} | Zoom: {zoom}</p>
        <ReactMapgl style={{height:"35rem", width:"41rem"}} latitude={loc.lat} longitude={loc.lng} zoom={zoom} mapStyle="mapbox://styles/mapbox/streets-v11" mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN}/>
    </div>
  )
}

export default Map