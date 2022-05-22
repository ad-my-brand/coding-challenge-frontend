import React, { useState } from "react";
import styles from "./Controller.module.css";

function Button(props: any) {

  return (
  <button onClick={props.handleChange} className={styles.button} >{props.children}</button>
  )
}

export default Button;
