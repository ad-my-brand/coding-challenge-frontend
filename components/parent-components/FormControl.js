import React, { useState } from "react";
import LocateOnMap from "./LocateOnMap";

export default function FormControl({ label, userData }) {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0) 
    function onUserChange(){
        setLat(userData[document.getElementById('username').value].lat)
        setLng(userData[document.getElementById('username').value].lng)
    }
  return (
    <div className="flex flex-col md:flex-row w-full md:w-10/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute transform">
      <div className="flex flex-col w-6/12 rounded-l-xl h-96 text-2xl font-semibold">
        <p className="">Select User</p>
        <select
          name="UserName"
          id="username"
          onChange={onUserChange}
          className="mx-1 my-2 bg-gray-200 dark:bg-gray-800 h-10 ml-4 rounded-md outline-none px-2 focus:ring-1 shadow-sm text-center text-lg placeholder-opacity-40 w-6/12"
        >
          {userData.map((data, index) => (
            <option key={index} id={data.id} value={data.id} className="py-4">
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-6/12 rounded-r-xl h-96 -ml-2">
        <LocateOnMap lat={lat} lng={lng} />
      </div>
    </div>
  );
}
