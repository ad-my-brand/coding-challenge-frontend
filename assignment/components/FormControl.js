import { useState } from "react";

export default function FormControl({
  id,
  label,
  type,
  placeholder,
  validationFun,
  onChangeFun,
  options,
}) {
  const [error, setError] = useState("Invalid data");
  const [valid, setValid] = useState(true);
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" && (
        <textarea
          id={id}
          className="form-control"
          placeholder={placeholder}
          rows={3}
          onChange={(e) => {
            let value = e.target.value;
            let validationRes = validationFun(value);
            setValid(validationRes.valid);
            if (valid) {
              onChangeFun(e.target.value);
            }
            setError(validationRes.error);
          }}
        />
      )}
      {type === "select" && (
        <select
          id={id}
          className="form-select"
          onChange={(e) => {
            let value = e.target.value;
            let validationRes = validationFun(value);
            setValid(validationRes.valid);
            if (valid) {
              onChangeFun(e.target.value);
            }
            setError(validationRes.error);
          }}
        >
          <option value="0">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
      {type !== "textarea" && type !== "select" && (
        <input
          id={id}
          className="form-control"
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            let value = e.target.value;
            let validationRes = validationFun(value);
            setValid(validationRes.valid);
            if (valid) {
              onChangeFun(e.target.value);
            }
            setError(validationRes.error);
          }}
        />
      )}
      {!valid && <span className="text-danger">Error : {error}</span>}
    </div>
  );
}
