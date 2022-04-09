import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
export class Maps extends Component {
    render() {
        return (
            <>
                <Map
                    google={this.props.google}
                    style={{ width: "100%", height: "100%" }}
                    zoom={10}
                    initialCenter={{ lat: -1.2884, lng: 36.8233 }}
                />
            </>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: "API_KEY",
})(Maps);
