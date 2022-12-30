import { Box } from '@chakra-ui/react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export const Map = ({ position = {
  lat: 51.505,
  lng: -0.09
} }) => {
  return (
    <Box style={
      {
        width: '100%',
        height: '350px',
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid #ccc'
      }
    } >
      <MapContainer style={{ width: '100%', height: '100%', overflow: 'hidden' }} center={position} zoom={4} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position && [parseFloat(position?.lat), parseFloat(position?.lng)]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>

  )
}
