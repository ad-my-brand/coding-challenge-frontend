import { ChangeEventHandler, HTMLAttributes, useEffect, useState } from "react";

type FormControlProps = HTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> & {
  component: "input" | "select" | "textarea";
  label: string;
  name: string;
  validate: (value: string) => string;
  required?: boolean;
  dirty?: boolean;
  value?: string;
};

function FormControl(props: FormControlProps) {
  const {
    label,
    validate,
    name,
    children,
    onChange,
    dirty,
    defaultValue,
    value: valueProp,
    component,
    ...rest
  } = props;
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>(
    `${valueProp || defaultValue || ""}`
  );

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { value: eventValue } = e.target;
    setValue(eventValue);
    setError(validate(eventValue));
    onChange?.(e);
  };

  useEffect(() => {
    if (dirty) setError(validate(value));
  }, [dirty]);

  return (
    <div>
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
        {error !== "" && (
          <span className="label-text-alt text-error">{error}</span>
        )}
      </label>
      {component === "input" && (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={() => setError(validate(value))}
          {...rest}
          className={`form-input ${error !== "" ? "input-error" : ""}`}
          data-testid="input"
        />
      )}
      {component === "select" && (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          {...rest}
          className={`form-select ${error !== "" ? "select-error" : ""}`}
          data-testid="select"
        >
          {children}
        </select>
      )}
      {component === "textarea" && (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          {...rest}
          className={`form-textarea ${error !== "" ? "textarea-error" : ""}`}
          data-testid="textarea"
        />
      )}
    </div>
  );
}

FormControl.defaultProps = {
  validate: (value: string) => "",
  label: "",
  name: "",
  component: "input",
};

export default FormControl;
