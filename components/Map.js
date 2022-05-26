import { useEffect, useState } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import mapboxgl from "mapbox-gl";

const Map = ({ knowUser, userList }) => {
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
    if (knowUser == undefined || userList == undefined || userList == 0) return;

    const map = new mapboxgl.Map({
      container: "map",
      style:
        timeOfTheDay == "day"
          ? "mapbox://styles/mapbox/navigation-day-v1"
          : "mapbox://styles/mapbox/navigation-night-v1",
      center: [
        userList[knowUser].props.coords.lng,
        userList[knowUser].props.coords.lat,
      ],
      zoom: 1,
    });
    if (1) {
      addMarker(map, [
        userList[knowUser].props.coords.lng,
        userList[knowUser].props.coords.lat,
      ]);
    }
  }, [userList, knowUser]);
  return <Wrapper id="map"></Wrapper>;
};

const Wrapper = tw.div`
flex-1
rounded-lg
`;

export default Map;
