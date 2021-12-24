import React, { useState, useEffect, Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <Map
        google={this.props.google}
        style={{
          width: "50vw",
        }}
        center={{
          lat: -37.3159,
          lng: 81.1496,
        }}
        zoom={14}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBhzcsPOtFH4rCadUXi7JDs-nfO6ADBWdE",
})(SimpleMap);
