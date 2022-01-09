import React from "react";

import classes from "./FormControl.module.css";

const FormControl = (props) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default FormControl;
