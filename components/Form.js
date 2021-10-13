import React from "react";
const Form = ({ label, onChange }) => {
  return (
    <>
      <label htmlFor={`${label}`}>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
      {label === "body" ? (
        <textarea type="text" name={`${label}`} onChange={onChange} requierd="true" minLength="10" maxLength="300"/>
      ) : (
        <input type="text" name={`${label}`} onChange={onChange} required="true" minLength="5"/>
      )}
    </>
  );
};

export default Form;
