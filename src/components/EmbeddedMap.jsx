import React from "react"
import key from './apikeys'


function EmbeddedMap(props) {
    let src = "https://www.google.com/maps/embed/v1/place?key="+key.toString()+"&q="+props.address.city+"+"+props.address.street
    return (
        <iframe
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}>
        </iframe>
    )
}


export default EmbeddedMap