import React, { Fragment, useState } from "react";
import Modal from "../UI/Modal";

import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({});

  const googleLocationHandler = (lat, lng, locationName) => {
    setLocation({ lat: +lat, lng: +lng, city: locationName });
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal
          lat={location.lat}
          lng={location.lng}
          locationName={location.city}
          onHideModal={hideModalHandler}
        />
      )}
      <ul className={classes["users-list"]}>
        {props.users.map((user) => (
          <li className={classes["user-list"]} key={user.id}>
            <div className={classes["user-list__name-part"]}>
              <span className={classes["user-list__name"]}>{user.name}</span> |{" "}
              <span className={classes["user-list__username"]}>
                {user.username}
              </span>
            </div>
            <span className={classes["user-list__email"]}>
              <i
                className="fas fa-at"
                style={{ marginRight: "5px", verticalAlign: "middle" }}
              ></i>
              {user.email}
            </span>
            {/* <span className={classes["user-list__address"]}>
                <i
                  className="far fa-address-card "
                  style={{ marginRight: "5px", verticalAligh: "middle" }}
                ></i>
                {user.address.city}
              </span> */}
            <span
              className={classes["user-list__location"]}
              onClick={() =>
                googleLocationHandler(
                  user.address.geo.lat,
                  user.address.geo.lng,
                  user.address.city
                )
              }
            >
              <i
                className="fas fa-map-marked fa-2x"
                style={{ color: "#F05454", verticalAlign: "middle" }}
              ></i>
            </span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default UsersList;
