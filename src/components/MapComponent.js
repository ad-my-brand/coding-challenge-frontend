import Map from "mapmyindia-react";

const MapComponent = ({lat, lng}) => {

    return (<Map
        markers={[
            {
                position: [lat, lng],
                draggable: false,
                title: "title",
            },
        ]}
    />)
}

export default MapComponent