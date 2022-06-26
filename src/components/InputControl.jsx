import React from "react";

export default function InputControl({
  heading,
  labelId,
  name,
  value,
  onChange,
}) {
  return (
    <div className="inputControl">
      <label htmlFor={labelId}>{heading}</label>
      <input
        minLength="3"
        type="text"
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
