import React from "react";

const Label = (props) => {
  const { id, labelText, required } = props;
  return (
    <label
      htmlFor={id}
      className="font-serif font-bold text-md tracking-wide mx-auto w-96"
    >
      {labelText}
      {required && <span className="font-medium">*</span>}
    </label>
  );
};

export default Label;
