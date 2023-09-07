// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "../Components/leaflet-custom.css";

// const Map = ({ userLocation }) => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Debugging: Log userLocation to check if it's being updated correctly
//     console.log("userLocation:", userLocation);

//     // Initialize the map if it's not already initialized
//     if (!mapInstance.current) {
//       mapInstance.current = L.map(mapRef.current).setView([0, 0], 2); // Default view (world map)

//       // Add a base map (you can replace this with your preferred tile layer)
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright"></a>',
//       }).addTo(mapInstance.current);
//     }

//     // Add a marker for the user's location (if available)
//     if (userLocation) {
//       // Debugging: Log userLocation to check if it's valid
//       console.log("Adding marker at:", userLocation);

//       const customIcon = L.divIcon({
//         className: "custom-marker-icon", // Use the custom CSS class
//         html: "User Location", // Customize the marker's content
//       });

//       L.marker(userLocation, { icon: customIcon })
//         .addTo(mapInstance.current)
//         .bindPopup("User Location"); // Customize the popup message as needed

//       mapInstance.current.setView(userLocation, 1); // Adjust the zoom level != 13
//     }
//   }, [userLocation]);

//   return <div ref={mapRef} className="w-full h-64 border rounded mt-4"></div>;
// };

// export default Map;
// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = ({ userLocation }) => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Initialize the map if it's not already initialized
//     if (!mapInstance.current) {
//       mapInstance.current = L.map(mapRef.current).setView([0, 0], 2); // Default view (world map)

//       // Add a base map (you can replace this with your preferred tile layer)
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'></a>",
//       }).addTo(mapInstance.current);
//     }

//     // Add a marker for the user's location (if available)
//     if (userLocation) {
//       // Create a custom icon
//       const customIcon = L.divIcon({
//         className: "bg-blue-500 text-white py-1 px-2 rounded-full font-semibold",
//         html: "User Location",
//       });

//       // Add the marker with the custom icon
//       L.marker(userLocation, { icon: customIcon })
//         .addTo(mapInstance.current)
//         .bindPopup("User Location") // Customize the popup message as needed
//         .openPopup();

//       // Set the view to the user's location with an adjusted zoom level
//       mapInstance.current.setView(userLocation, 1); // You can adjust the zoom level (e.g., 8) as needed
//     }
//   }, [userLocation]);

//   return <div ref={mapRef} className="w-full h-64 rounded-lg shadow-lg mt-4"></div>;
// };

// export default Map;

// Map.js

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ userLocation }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map if it's not already initialized
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 2); // Default view (world map)

      // Add a base map (you can replace this with your preferred tile layer)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          "&copy; <a href='https://www.openstreetmap.org/copyright'></a>",
      }).addTo(mapInstance.current);
    }

    // Add a marker for the user's location (if available)
    if (userLocation) {
      // Create a custom icon
      const customIcon = L.divIcon({
        className:
          "bg-blue-500 text-white py-1 px-2 rounded-full font-semibold",
        html: "User Location",
      });

      // Add the marker with the custom icon
      L.marker(userLocation, { icon: customIcon })
        .addTo(mapInstance.current)
        .bindPopup("<div data-testid='user-location-popup'>User Location</div>") // Add data-testid
        .openPopup();

      // Set the view to the user's location with an adjusted zoom level
      mapInstance.current.setView(userLocation, 1); // zoom in and out by change value
    }
  }, [userLocation]);

  return (
    <div ref={mapRef} className="w-full h-64 rounded-lg shadow-lg mt-4"></div>
  );
};

export default Map;
