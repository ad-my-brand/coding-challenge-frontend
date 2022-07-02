import React from 'react'
import '../App.css'

function MapContainer({url}) {
    console.log(url);
    return (
        <>
        <div className="mapcontainer">
            
            <iframe src={url} frameBorder="0" style={{ border: 0 }}></iframe>
        </div>
        </>
    )
}

export default MapContainer