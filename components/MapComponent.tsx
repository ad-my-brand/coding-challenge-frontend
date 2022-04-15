import React, { useEffect, useState } from 'react'
import { Map, Marker } from 'pigeon-maps'
import { useAppContext } from '../context/AppContext'
import Person from '../interfaces/person.interface'

const MapComponent = () => {
  const { data, id }: { data: Array<Person>; id: number } = useAppContext()
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  if (!data.length) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-3xl text-gray-600">Loading</h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Map
      defaultZoom={2}
    >
      <Marker
        width={50}
        anchor={[
          Number(data[id - 1].address.geo.lat),
          Number(data[id - 1].address.geo.lng),
        ]}
        color={color}
        onClick={() => setHue(hue + 20)}
      />
    </Map>
    </div>
  )
}

export default MapComponent
