import React, { useEffect, useRef } from "react";

const Map = () => {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center: {
        lat: 150,
        lng: 150,
      },
      zoom: 8,
    });
  }, []);

  return <div ref={ref} style={{ borderRadius: "0.5rem" ,width: "100%", height: "500px" }} id="map" />;
};

export default Map;
