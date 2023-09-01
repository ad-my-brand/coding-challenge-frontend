// Map.js
import React, { Component } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

class MapContainer extends Component {
  componentDidMount() {
    if (!this.map) {
  
      this.map = L.map('map').setView([0, 0], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    }

    
    if (this.props.userLocation) {
      L.marker(this.props.userLocation).addTo(this.map);
    }
  }

  render() {
    return (
      <div id="map" style={{ width: '100%', height: '300px' }}></div>
    );
  }
}

export default MapContainer;
