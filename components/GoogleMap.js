import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    
  };
export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  
    activeMarker: {},          
    selectedPlace: {}          
  };
   
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
   
    render() {
      return (
        <>
        {console.log("In the map "+this.props.data[0].name)}
        {console.log("In the map "+ parseFloat(this.props.data[0].address.geo.lat))}
        {console.log("In the map "+parseFloat(this.props.data[0].address.geo.lng))}
      {/* <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: parseFloat(this.state.data[0].address.geo.lat),
            lng: parseFloat(this.state.data[0].address.geo.lng)
          }
        }
      /> */}
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: parseFloat(this.props.data[0].address.geo.lat),
            lng: parseFloat(this.props.data[0].address.geo.lng)
          }
        }
      >
        <Marker
          onClick={this.onMarkerClick}
          name={this.props.data[0].company.name}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
        </>
      )
    }
  }
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCWzPglvTkM1vSE7L_Yj0WQYllx5S36a48")
})(MapContainer)