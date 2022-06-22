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
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `99%` }} />}
        />
    )
}