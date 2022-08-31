import {
    useJsApiLoader,
    GoogleMap,
} from '@react-google-maps/api'

export default function Map({ lat, lng }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDpQYJ-V8sa8kTZKVFK6wduejGN5Bi1CuY",
    })
    return (
        <>
            {isLoaded && <GoogleMap
                center={{ lat, lng }}
                zoom={15}
                mapContainerStyle={{ width: '500px', height: '300px' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >

            </GoogleMap>}
        </>
    )
}