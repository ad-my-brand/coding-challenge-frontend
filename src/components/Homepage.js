import React, { useState, useEffect } from "react";
import axios from "axios";
import Mapbox from "./Mapbox";
import FormControl from "./Form";

function HomePage(props) {
  const [userList, setUserList] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  useEffect(() => {
    const fetchUsers = async () => {
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
      setUserList(requiredUserList);
    };
    try {
      fetchUsers();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const processForm = (userId) => {
    const fetchUsers = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/users/" + userId,
          });
          const userData = await response.data;
          const coordinates = userData.address.geo;
          setCoordinates(coordinates);
          setShowMap(true);
          return resolve("Found");
        } catch (err) {
          setShowMap(false);
          return reject(err.message);
        }
      });
    };
    fetchUsers()
      .then((message) => {
        console.log(message, "success");
      })
      .catch((error) => {
        console.log(error, "failure");
      });
  };

  return (
    <div className="ui container">
      <div className="content">
        <FormControl
          warningText={"Please select a valid user id."}
          userList={userList}
          processForm={processForm}
        />
      </div>
      {showMap && <Mapbox coordinates={coordinates} />}
    </div>
  );
}
export default HomePage;
