import React from "react";
import { Icon } from "@iconify/react";

export const LocationPin = ({ text }) => {
  return (
    <div className="pin">
      <Icon icon="clarity:map-marker-solid" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
};
