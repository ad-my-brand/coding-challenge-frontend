import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css';

function Map(props) {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const setLocation = async () => {

        console.log("props", props);
        console.log(props.Users.length);
        for (var i = 0; i < props.Users.length; i++) {
            if (props.Users[i].id === parseInt(props.selectedUser)) {
                setLat(props.Users[i].address.geo.lat)
                setLong(props.Users[i].address.geo.lng)
            }
        }
    }

    useEffect(() => {
        setLocation();
    }, [props])

    return (<div>

        <div style={{
            width: '500px',
            height: '300px',
            margin: '10px',
        }}>
            {props && lat ?
                <MapContainer
                    center={[lat, long]}
                    zoom={1}
                    scrollWheelZoom={false}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[lat, long]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} />
                </MapContainer>
                : <></>}
            {console.log("props.users", props.Users)}
            {console.log("lat", lat)}
            {console.log("long", long)}
        </div>
    </div>
    )
}

export default Map