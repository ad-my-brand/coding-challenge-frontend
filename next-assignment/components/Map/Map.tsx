import ReactMapGL, { Marker } from "react-map-gl";
import styles from "./Map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map(props: any) {
  return (
    <div className={styles.map}>
    <ReactMapGL
      style={{ height: "25rem", width: "42rem", borderRadius: "0.6rem", scale: "1.5rem" }}
      zoom={5}
      attributionControl={false}
      latitude={props.location.lat}
      longitude={props.location.lng}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiYWR4eHR5YSIsImEiOiJjbDNlcHJxeWcwMXRiM2Jtb3o3ZmJiMjFoIn0.SDgZAI-kRyqIz70Qg2PHeA"
    />
    </div>
  )}