import React, { useState, useEffect } from "react";
import axios from "axios";

import FormControl from "../components/FormControl/FormControl";

import "./HomePage.css";
import Spinner from "../components/Spinner/Spinner";
import MapRender from "../components/MapRender/MapRender";

function HomePage(props) {
  const [userList, setUserList] = useState([]);
  const [isListLoading, setIsListLoading] = useState(undefined);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsListLoading(true);
      const response = await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users",
      });

      const userListData = await response.data;

      const requiredUserList = [];
      console.log(userListData);
      userListData.forEach((user) => {
        requiredUserList.push({
          id: user.id,
          name: user.name,
        });
      });
      setIsListLoading(false);
      setUserList(requiredUserList);
    };

    try {
      fetchUsers();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  console.log(isListLoading);

  const processForm = (userId) => {
    const fetchUsers = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/users/" + userId,
          });

          const userData = await response.data;
          const location = {};
          const coordinates = userData.address.geo;
          location["lat"] = Number(coordinates.lat);
          location["lng"] = Number(coordinates.lng);
          console.log("Location", location);
          setCoordinates(location);

          setShowMap(true);
          return resolve("Found");
        } catch (err) {
          setShowMap(false);
          return reject(err.message);
        }
      });
    };

    fetchUsers()
      .then((msg) => {
        props.setAppError(true, "success", "Location Found !");
      })
      .catch(() => {
        props.setAppError(true, "warning", "Network Error");
      });
  };

  return (
    <div className="homePage__Wrapper">
      <div className="homePage__ActionContainer">
        {isListLoading ? (
          <Spinner />
        ) : (
          <FormControl
            warningText={"Please select a valid user id."}
            userList={userList}
            processForm={processForm}
          />
        )}
      </div>
      {showMap && <MapRender lat={coordinates.lat} lng={coordinates.lng} />}
    </div>
  );
}

export default HomePage;
