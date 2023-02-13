import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

export default function Map({ geo }) {
	const { lat: latitude, lng: longitude } = geo;

	const mapContainer = useRef(null);
	const map = useRef(null);
	const elemRef = useRef(null);

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [longitude, latitude],

			zoom: 2,
		});

		new mapboxgl.Marker({
			element: elemRef.current,
		})
			.setLngLat([longitude, latitude])
			.addTo(map.current);
	}, [map, latitude, longitude]);

	return (
		<div
			style={{ width: 800, height: 600, backgroundColor: 'gray' }}
			ref={mapContainer}
		>
			<div className="marker" ref={elemRef} />
		</div>
	);
}
