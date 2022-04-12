import React from "react";

export default function GMaps({ lat, lon }) {

  return (
    <>
      <iframe
        className="mapiframe"
        src={`https://www.bing.com/maps/embed?h=500&w=500&cp=${lat}~${lon}`}
        scrolling="no"
      ></iframe>
    </>
  );
}
