import React, { useState } from "react";
import styles from "./Controller.module.css";

function Controller(props: any) {
  // console.log(props);
  
  const { label, errorMessage, onChange, ...controllerProps } = props
  const [focused, setFocused] = useState(false)


  const handleFocus = (event: any) => {
    setFocused(true)
  }


  return (
    <div>
      <div className={styles.form_container}>
        <div className={styles.close_button}></div>
        <div className={styles.form_element}>
          <label className={styles.label}>{props.label}</label> <br />
          <input
            className={styles.input}
            ref={props.ref}
            type={props.type}
            id={props.htmlFor}
            {...controllerProps}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            required={props.required}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className={styles.span}>{props.errorMessage}</span>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Controller;
