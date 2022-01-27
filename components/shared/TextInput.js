import React from "react";
import Label from "./Label";

const TextInput = ({ type, id, onChange, required = false, labelText, value}) => {
  return (
    <>
    <Label labelText={labelText} id={id} required={required} />
      <input
        type={type}
        id={id}
        value={value}
        className="font-serif text-md border-2 mx-auto mb-8 p-2 rounded-md w-72 "
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default TextInput;
