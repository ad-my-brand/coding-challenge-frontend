import React from 'react';

export default function Radio(props) {
  return (
    <div>
      <input
        className="pointer"
        id={props.label}
        name="radio"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      <label className="pointer" htmlFor={props.label}>
        {props.label}
      </label>
    </div>
  );
}
