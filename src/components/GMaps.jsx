import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GMaps({ userId, users }) {
  const apiKey = process.env.REACT_APP_GMAPS_API_KEY;
  const [position, setPosition] = useState({ lat: -37.3159, lng: 81.1496 });

  const pos = useRef();
  useEffect(() => {
    //checks if userId matches with user.id
    //then add the matched users position to current
    users.map((user) => {
      if (parseInt(user.id) === parseInt(userId)) {
        let coords = user.address.geo;
        setPosition({ ...coords });
        return (pos.current.props.center[0] = user.address.geo);
      } else {
        return null;
      }
    });
  }, [userId, users]);

  //converting string coordinates to float
  let lat = parseFloat(position.lat);
  let lng = parseFloat(position.lng);

  //location marker component
  const Marker = () => {
    return (
      <div>
        <FaMapMarkerAlt size={"3em"} color={"red"} />{" "}
      </div>
    );
  };
  return (
    <div className="map">
      <GoogleMapReact
        ref={pos}
        bootstrapURLKeys={{ key: apiKey }}
        center={{ lat: lat, lng: lng }}
        defaultZoom={4}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}
