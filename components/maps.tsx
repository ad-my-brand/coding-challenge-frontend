import React, { useEffect, useState, useCallback } from 'react';
import type { FetchInterface } from '../pages/api/types';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export default function Maps(props: { 
    userData: FetchInterface[] | null,
    userId: number
}) {
    const [ coordinates, setCoordinates ] = useState<{ lat: number, lng: number} | null>(null);
    const [ maps, setMap ] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
    });

    useEffect(() => {
        if (props.userData !== null && props.userId !== 0) {
            let ob = (props.userData.find(u => u.id === props.userId));
            setCoordinates({ lat: parseInt(ob!.address.geo.lat), lng: parseInt(ob!.address.geo.lng)});
        }
    }, [props]);

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(coordinates);
        map.fitBounds(bounds);
        setMap(map)
    }, [ coordinates ]);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);
    
    return (isLoaded && coordinates !== null) ?
        <GoogleMap
            mapContainerClassName='map-container'
            center={ coordinates }
            zoom={ 3 }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
        >
            <Marker position={ coordinates }></Marker>
        </GoogleMap>
    : <></>
}