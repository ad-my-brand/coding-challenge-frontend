import React, { useEffect, useRef, useState } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Card } from '@mui/material';

const Map = ({ coords }) => {
	const mapElement = useRef();
	const { mapLongitude, mapLatitude } = coords;

	const [mapZoom, setMapZoom] = useState(1.8);

	const [map, setMap] = useState({});

	let size = 350;
	useEffect(() => {
		let map;
		try {
			map = tt.map({
				key: process.env.NEXT_PUBLIC_MAP_KEY,

				container: mapElement.current,

				center: [mapLongitude, mapLatitude],

				zoom: mapZoom,
			});
		} catch (err) {
			alert('Error in map');
		}
		let popup = new tt.Popup({
			closeButton: false,
			offset: size / 2,
			anchor: 'button',
		});

		let marker = new tt.Marker()
			.setLngLat([mapLongitude, mapLatitude])
			.setPopup(popup);
		marker.addTo(map);

		setMap(map);

		return () => map.remove();
	}, [coords]);

	return (
		<div className="">
			<h2 className="text-lg mb-2 font-semibold">Map</h2>

			<Card>
				<div
					ref={mapElement}
					style={{
						width: '350px',
						height: '350px',
					}}
					className="mapDiv"
				></div>
			</Card>
		</div>
	);
};

export default Map;
