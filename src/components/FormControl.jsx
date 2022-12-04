import React from "react";

function FormControl(props) {
  const { label, type, placeholder, value, data, onChange, as } = props;

  return (
    <div className="form-control">
      <label>{label}</label>
      {as === "select" ? (
        <select value={value} onChange={onChange}>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default FormControl;
