import React from "react";
import ReactDOM from "react-dom";
import GoogleMap from "../GoogleMap";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div onClick={props.onHideModal} className={classes.backdrop}>
      {props.children}
    </div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const center = { lat: props.lat, lng: props.lng };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        document.getElementById("backdrop--root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <GoogleMap city={props.locationName} center={center} />
        </ModalOverlay>,
        document.getElementById("modaloverlay--root")
      )}
    </React.Fragment>
  );
};

export default Modal;
