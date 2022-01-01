import axios from "axios";
import React, { useState } from "react";
import { SVG_BOLT } from "../SVGs";
import LocateOnMap from "./LocateOnMap";

export default function FormControl({ label, userData }) {
  const [lat, setLat] = useState(userData[0].lat);
  const [lng, setLng] = useState(userData[0].lng);
  const [isMapVisible, setIsMapVisible] = useState(true);
  function onUserChange() {
    setLat(userData[document.getElementById("username").value].lat);
    setLng(userData[document.getElementById("username").value].lng);
    setIsMapVisible(false);
    setTimeout(() => {
      setIsMapVisible(true);
    }, 50);
  }

  function formSubmit() {
    let formTitle = document.getElementById("formtitle").value;
    let formBody = document.getElementById("formbody").value;
    let userId = document.getElementById("username").value;
    //   Checking if title and body are not empty
    if (
      formTitle.replaceAll(" ", "") != "" &&
      formBody.replaceAll(" ", "") != ""
    ) {
      //   Submit form
      let dataToSubmit = {
        title: formTitle,
        body: formBody,
        userId: userId,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/posts", dataToSubmit)
        .then((res) => {
          alert(res.status);
          // if res.data.id > 100 then it means that it is submitted but will not reflect on server because limit 100 is already reached
        });
    } else {
      //   error alert
    }
  }
  return (
    <div className="w-full  flex flex-col items-center">
      <p className="text-3xl font-bold underline underline-offset-8 decoration-wavy">{label}</p>
    <div className="flex flex-col md:flex-row w-full md:w-10/12 mt-16">
      {/* Left Leaning Part */}
      <div className="flex flex-col w-6/12 rounded-l-xl h-max text-2xl font-semibold items-center">
        <form action="" className="w-full">
          <p className="">Select User</p>
          <select
            name="UserName"
            id="username"
            onChange={onUserChange}
            className="mx-1 my-2 bg-zinc-100 dark:bg-zinc-600 h-10 ml-4 rounded-md outline-none px-2 focus:ring-2 shadow-xl shadow-zinc-300/50 dark:shadow-zinc-900/50 text-center text-lg placeholder-opacity-40 w-6/12"
          >
            {userData.map((data, index) => (
              <option key={index} id={data.id} value={data.id} className="py-4">
                {data.name}
              </option>
            ))}
          </select>
          <p className="mt-6">Title</p>
          <input
            type="text"
            name=""
            id="formtitle"
            placeholder="Title (max 100 characters)"
            maxLength={100}
            className="mx-1 my-2 bg-zinc-100 dark:bg-zinc-600 h-12 ml-4 rounded-md outline-none px-2 focus:ring-2 shadow-xl shadow-zinc-300/50 dark:shadow-zinc-900/50 text-center text-2xl placeholder-opacity-40 w-11/12"
          />
          <p className="mt-6">Body</p>
          <textarea
            name=""
            id="formbody"
            placeholder="Body"
            maxLength={100}
            className="mx-1 my-3 p-2 bg-zinc-100 dark:bg-zinc-600 h-80 ml-4 rounded-md outline-none px-4 focus:ring-2 shadow-xl shadow-zinc-300/50 dark:shadow-zinc-900/50 text-xl placeholder-opacity-40 w-11/12"
          />
        </form>
        <button
          onClick={formSubmit}
          className="flex flex-row z-10 border-zinc-500 dark:border-cyan-400 border-2 m-4 p-2 px-6 w-max rounded-lg text-xl justify-center items-center opacity-75 transition-all transform ease-in-out duration-300 hover:opacity-95 hover:text-zinc-100 dark:hover:text-cyan-100 hover:bg-zinc-500 dark:hover:bg-cyan-400 font-semibold hover:scale-[0.98] active:scale-95 shadow-lg hover:shadow-zinc-500/20 dark:hover:shadow-cyan-400/20"
        >
          Submit
          <SVG_BOLT />
        </button>
      </div>
      {/* Right Leaning Part */}
      <div className="flex w-6/12 rounded-r-xl h-full -ml-2 justify-center">
        {isMapVisible && (
          <LocateOnMap
            lat={parseFloat(lat)}
            lng={parseFloat(lng)}
            trunLat={parseFloat(lat).toFixed(2)}
            trunLng={parseFloat(lng).toFixed(2)}
          />
        )}
      </div>
    </div>
    </div>
  );
}
