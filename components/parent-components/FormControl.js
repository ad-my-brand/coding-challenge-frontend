import axios from "axios";
import React, { useState } from "react";
import { SVG_ALERT, SVG_BOLT } from "../SVGs";
import LocateOnMap from "./LocateOnMap";

export default function FormControl({ label, userData }) {
  const [lat, setLat] = useState(userData[0].lat);
  const [lng, setLng] = useState(userData[0].lng);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
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
          if(res.status == 200 || res.status == 201){
            // if res.data.id > 100 then it means that it is submitted but will not reflect on server because limit 100 is already reached
            if(res.data.id > 100){
              showAlertLimit()
            }else{
              // Submit Success
                showAlertSuccess()
            }
            // Resetting Data
            document.getElementById("formtitle").value = ""
            document.getElementById("formbody").value = ""
            document.getElementById("username").value = 1
          }else{
            alert("Submit Failed! /n HTTP Error Code: " + res.status)
          }
        });
    } else {
      //   error alert
      showAlert()
    }
  }
  function showAlert() {
    if (!isAlertVisible) {
      setIsAlertVisible(true);
      document.getElementById("alerterror").style.display = "flex";
      setTimeout(() => {
        setIsAlertVisible(false);
        document.getElementById("alerterror").style.display = "none";
      }, 3000);
    }
  }
  function showAlertLimit() {
    if (!isAlertVisible) {
      setIsAlertVisible(true);
      document.getElementById("alertlimit").style.display = "flex";
      setTimeout(() => {
        setIsAlertVisible(false);
        document.getElementById("alertlimit").style.display = "none";
      }, 3000);
    }
  }
  function showAlertSuccess() {
    if (!isAlertVisible) {
      setIsAlertVisible(true);
      document.getElementById("alertsuccess").style.display = "flex";
      setTimeout(() => {
        setIsAlertVisible(false);
        document.getElementById("alertsuccess").style.display = "none";
      }, 3000);
    }
  }
  return (
    <div className="w-full  flex flex-col items-center">
      <p className="text-3xl font-bold underline underline-offset-8 decoration-wavy">
        {label}
      </p>
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
                <option
                  key={index}
                  id={data.id}
                  value={data.id}
                  className="py-4"
                >
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
      {/* Alert for  Empty fields*/}
      <div
        id="alerterror"
        className="fixed top-6 z-50 w-max fade-in-out hidden left-1/2 transform -translate-x-1/2 items-center bg-rose-400 dark:bg-rose-500 text-zinc-50 p-2 px-4 sm:px-6 md:px-8 text-lg sm:text-xl rounded-lg"
      >
        <SVG_ALERT/>
        Title and Body are required!
      </div>
      {/* Alert for Limit React*/}
      <div
        id="alertlimit"
        className="fixed top-6 z-50 w-max fade-in-out hidden left-1/2 transform -translate-x-1/2 items-center bg-rose-400 dark:bg-rose-500 text-zinc-50 p-2 px-4 sm:px-6 md:px-8 text-lg sm:text-xl rounded-lg"
      >
        <SVG_ALERT/>
        Submitted, it may not reflect on server because limit reached
      </div>
      {/* Alert for Successful Submission*/}
      <div
        id="alertsuccess"
        className="fixed top-6 z-50 w-max fade-in-out hidden left-1/2 transform -translate-x-1/2 items-center bg-green-400 dark:bg-green-500 text-zinc-50 p-2 px-4 sm:px-6 md:px-8 text-lg sm:text-xl rounded-lg"
      >
        <SVG_ALERT/>
        Submitted, it may not reflect on server because limit reached
      </div>
    </div>
  );
}
