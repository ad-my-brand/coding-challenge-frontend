import React from "react";
import "./LoadOverlay.css";

function LoadOverlay() {
  return (
    <div className="uploadOverlay">
      <div className="uploadOverlay__Modal">
        <div className="submitLoader">Loading...</div>
        <p>Uploading data</p>
      </div>
    </div>
  );
}

export default LoadOverlay;
