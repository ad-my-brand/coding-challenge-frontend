import React from "react";

function Label(props) {
  return (
    <label className="selectionLabel" htmlFor="userIdSelection">
      {props.text}
    </label>
  );
}

export default Label;
