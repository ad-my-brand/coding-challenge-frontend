import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

//parseFloat(this.props.location.lat)
const  Map=(props) =>{
  const { lat, lng } = props.location;
  const [isOverlayOpen, showMarkerOverlay] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  useEffect(() => {
    setViewport({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      zoom: 4,
    });
  }, [lat, lng]);

  return (
    <div className="flex-1 shadow-md rounded overflow-hidden" style={{minHeight:"50vh"}}>
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v8"
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoidGhha3VydGhlZ3I4IiwiYSI6ImNrczdoZjcxajBsOXoybm9jd2VteXRibGkifQ.WpquRuj1q2Ld2yDqLnDiEg"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker
        key={Math.random()}
        latitude={parseFloat(lat)}
        longitude={parseFloat(lng)}
      >
        <div onMouseOver={() => showMarkerOverlay(true)} onMouseLeave={()=> showMarkerOverlay(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#000"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {
            isOverlayOpen && (
              <div className="bg-white px-4 py-2 border shadow-md">Coordinates are ({lat}, {lng})</div>
            )
          }
        </div>
      </Marker>
    </ReactMapGL>
    </div>
  );
}
export default Map;
