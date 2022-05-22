import React, { Component } from 'react';
import {Map ,GoogleApiWrapper} from 'google-maps-react';

class SimpleMap extends Component {
  

  render() {
    return (
      <Map
      google={this.props.google} 
      style={{width:"100%",height:"100%"}}
      zoom={7}
      initialCenter={{
        lat:20.705331,
        lng : 77.22112}}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey:"AIzaSyDj_EAvuzP3r1cUf21tJDlEgpNdlpQnEO4"
})(SimpleMap)