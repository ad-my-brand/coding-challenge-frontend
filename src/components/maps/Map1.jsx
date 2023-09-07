import React, { useEffect, useState } from 'react'
import "./map1.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'



const Map1 = ({ users, userId }) => {


    const [selectedUser, setselectedUser] = useState([])
    const [center, setCenter] = useState([19.08, 25.67])


    // tracks selected user
    useEffect(() => {
        const filteredUser = users.filter((user) => user.id === userId)
        setselectedUser(filteredUser)
    }, [userId])


    return (
        <div className='map1'>
            <div className='mapHeader'>
                <div>User Location</div>
                <p>view exact location of users. If particualr user is not selected, map shows all users</p>
            </div>
            <MapContainer center={center} zoom={2} style={{ width: '100%', height: '95%', borderRadius: "10px", boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.42)' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {!selectedUser[0] ? (
                    users.map((user) => (
                        <Marker key={user.id} position={[user.address.geo.lat, user.address.geo.lng]}>
                            <Popup>
                                {user.username}<br />Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                            </Popup>
                        </Marker>
                    ))
                ) : (
                    <Marker key={selectedUser[0].id} position={[selectedUser[0].address.geo.lat, selectedUser[0].address.geo.lng]}>
                        <Popup>
                            {selectedUser[0].username}<br />Coordinates: {selectedUser[0].address.geo.lat}, {selectedUser[0].address.geo.lng}
                        </Popup>
                    </Marker>
                )}



            </MapContainer>
        </div >
    )
}

export default Map1