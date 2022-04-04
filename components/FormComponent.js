import React from 'react';

export default function FormComponent(props) {
  return (
    <>
      <label className="label" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        id={props.label}
        name={props.value}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
