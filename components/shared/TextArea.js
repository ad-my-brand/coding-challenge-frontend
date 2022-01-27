import React from "react";
import Label from "./Label";

const TextArea = (props) => {
  const { type, id, onChange, required = false, labelText, value } = props;
  return (
    <>
      <Label id={id} labelText={labelText} required={required} />
      <textarea
        type={type}
        id={id}
        value={value}
        className="font-serif text-md border-2 mx-auto mb-2 p-2 rounded-md w-72 h-20"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default TextArea;
