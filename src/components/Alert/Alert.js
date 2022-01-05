import React from "react";
import "./Alert.css";

function Alert(props) {
  const appError = props.appError;

  return (
    <div
      style={{}}
      className={`alert alert-${
        appError.type
      } alert-dismissible fade show alertMessage ${
        appError.state ? "visible" : ""
      }`}
      role="alert"
    >
      {appError.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
