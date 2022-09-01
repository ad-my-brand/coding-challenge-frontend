import { useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";

const Map = ({ center }) => {
    const [timeOfTheDay, setTimeOfTheDay] = useState("day");
    useEffect(() => {
        new Date().getHours() >= 18
            ? setTimeOfTheDay("night")
            : setTimeOfTheDay("day");
    }, []);

    mapboxgl.accessToken =
        "pk.eyJ1IjoidGhlLWFyY2hpdGVjdCIsImEiOiJjbDM5dWQ2eDgwZGg0M2JuM3U1dHFpOG5oIn0.9ZaM8FaBogA6tXvH-MXajw";

    const addMarker = (map, loc) => {
        const marker = new mapboxgl.Marker().setLngLat(loc).addTo(map);
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style:
                timeOfTheDay == "day"
                    ? "mapbox://styles/mapbox/navigation-day-v1"
                    : "mapbox://styles/mapbox/navigation-night-v1",
            center: center,
            zoom: 1,
        });
        if (1) {
            addMarker(map, center);
        }
    }, [center, timeOfTheDay]);
    return <div id="map"></div>;
};

export default Map;
