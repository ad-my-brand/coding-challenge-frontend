import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";

export default function Map (mapData) {

    const userLat = mapData.location.lat
    const userLng = mapData.location.lng
    const userName = mapData.name

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: userLat, lng: userLng }}
        >
          <Marker
            position={{ lat: userLat, lng: userLng }} 
          >
            <InfoWindow><div>{userName}'s location</div></InfoWindow>
          </Marker>
        </GoogleMap>
      ));

    return (
        <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOLb3absSv8FW_H7z3e9pHFSgOLhHkyWw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `99%` }} />}
        />
    )
}