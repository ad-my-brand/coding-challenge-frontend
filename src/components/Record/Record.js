import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFzaHUwMTQ4IiwiYSI6ImNrbTYzNWRrejBrN3kyeGtuMHplNXRxa28ifQ.o16giEVZj95PbfmhMvd9gA";

function Record(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log([
      Number.parseFloat(props.address?.geo.lng || 0),
      Number.parseFloat(props.address?.geo.lat || 0),
    ]);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [
        Number.parseFloat(props.address?.geo.lng || 0),
        Number.parseFloat(props.address?.geo.lat || 0),
      ],
      zoom: 3,
    });
  });

  return (
    <div
      className="semi-transparent"
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: "10px",
        margin: "15px",
        width: "93%",
        padding: "10px",
        display: "flex",
      }}
    >
      <div style={{ flex: "1" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Name - </h3> <p>{props.name}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Email - </h3> <p>{props.email}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Website - </h3> <p>{props.website}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Company - </h3> <p>{props.company?.name}</p>
        </div>
      </div>
      <div style={{ flex: "1" }}>
        <h3>Latitude : {props.address?.geo.lat || 0}</h3>
        <h3>Longitude : {props.address?.geo.lng || 0}</h3>
        <div
          ref={mapContainer}
          className="map-container"
          style={{ height: "300px" }}
        />
      </div>
    </div>
  );
}

export default Record;
