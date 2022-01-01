import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="text-3xl transform">{text}</div>;

export default function LocateOnMap({ lat, lng, trunLat, trunLng }) {
  let defaultProps = {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 4
  };
  console.log(lat, lng)
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <p className="text-3xl font-semibold mb-4 opacity-80">Location📌</p>
      <div className="w-full h-96 rounded-lg shadow-xl overflow-hidden">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBmULGm2Cs81_5ohf2dQtO1RrkZpTHLhQM" }} // please don't misuse this key
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={trunLat}
            lng={trunLng}
            text="📍"
          />
        </GoogleMapReact>
      </div>
      <div className="flex w-full mt-4 justify-center">
        <p className="mr-2">Latitude: {lat}</p>
        <p className="ml-2">Longitude: {lng}</p>
      </div>
      <p className="text-xs left-2 relative mt-4 opacity-50">*dev version of map is used, you'll get few warnings</p>
    </div>
  );
}
