import React,{Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";

class Location extends Component{
  render(){
  return (
    <div>
      <Map google={this.props.google} zoom={14}>

      <Marker onClick={this.onMarkerClick}
              name={'Current location'} />
      <InfoWindow onClose={this.onInfoWindowClose}>
       
      </InfoWindow>
      </Map>
    </div>
  );
}
}

export default Location;

export default GoogleApiWrapper({
  apiKey:(" https://maps.googleapis.com/maps/api/js")
})(Location)