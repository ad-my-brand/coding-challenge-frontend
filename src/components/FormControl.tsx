import { ChangeEventHandler, HTMLAttributes, useState } from "react";

type FormControlProps = HTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> & {
  component: "input" | "select" | "textarea";
  label: string;
  name: string;
  validate: (value: string) => string;
};

function FormControl(props: FormControlProps) {
  const { label, validate, name, children, onChange, component, ...rest } =
    props;
  const [error, setError] = useState<string>("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setError(validate(value));
    onChange?.(e);
  };

  return (
    <>
      {error !== "" && <span>{error}</span>}
      <label htmlFor={name}>{label}</label>
      {component === "input" && (
        <input name={name} onChange={handleChange} {...rest} />
      )}
      {component === "select" && (
        <select name={name} onChange={handleChange} {...rest}>
          {children}
        </select>
      )}
      {component === "textarea" && (
        <textarea name={name} onChange={handleChange} {...rest} />
      )}
    </>
  );
}

FormControl.defaultProps = {
  validate: (value: string) => "",
  label: "",
  name: "",
  component: "input",
};

export default FormControl;
