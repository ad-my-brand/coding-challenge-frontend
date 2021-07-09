import React from "react";

import "./FormControl.css";

function formControl(props) {
  let inputElement;

  switch (props.inputtype) {
    case "text":
      inputElement = <input type="text" {...props} />;
      break;
    case "email":
      inputElement = <input type="email" {...props} />;
      break;
    case "textarea":
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input type="text" {...props} />;
  }

  return (
    <div className="field-form-elem">
      <label>{props.label}</label>
      {inputElement}
      <small className="field-error-msg">{props.errorMsg}</small>
    </div>
  );
}

export default formControl;
