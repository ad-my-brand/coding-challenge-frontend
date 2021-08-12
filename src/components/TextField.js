import React from "react";
import { ErrorMessage, useField } from "formik";
import Select from "react-select";
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid rgba(209,213,219)",
    color: state.isSelected ? "blue" : "#292929",
    padding: 10,
    backgroundColor: state.isSelected ? "#9cdfff" : "#fff",
    fontWeight: "bold",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    border: "1px solid rgba(17,24,39)",
    display: "flex",
    backgroundColor: "rgb(249,250,251)",
    padding: "0.350rem 0",
    fontWeight: "bold",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const TextField = ({ label, ...props }) => {
  const [field, meta, value] = useField(props);
  const { type = "text", options, errors, setFieldValue, setLocation,values } = props;
  if (type === "select") {
    console.log(values)
    return (
      <>
        <Select
          options={options}
          styles={customStyles}
          name={field.name}
          value={values[field.name]==null?null:{label:values[field.name],value:values['userId']}}
          onChange={(e) => {
            console.log(e, "location");
            setFieldValue("userId", e.value,true);
            setFieldValue(field.name, e.label,true);
            setLocation(e.location);
          }}
          placeholder="Select"
        />
        <ErrorMessage
          name={field.name}
          className="text-sm text-red-500 font-semibold"
          component="span"
        />
      </>
    );
  }

  if (type === "textarea") {
    return (
      <>
        <label className="text-sm" htmlFor={field.name}>
          {props.label}
        </label>
        <textarea
          {...field}
          {...props}
          placeholder={props.placeholder}
          autoComplete="off"
          style={{ minHeight: "200px" }}
          className={`border bg-gray-50 font-semibold text-sm min-h-100 ${
            meta.touched && meta.error
              ? "border-red-600 focus:border-red-600 bg-red-50"
              : "border-gray-900 focus:border-green-600 focus:bg-green-100"
          } py-2 px-2 focus:outline-none  transition`}
        />

        <ErrorMessage
          name={field.name}
          className="text-sm text-red-500 font-semibold"
          component="span"
        />
      </>
    );
  }
  return (
    <>
      <label className="text-sm" htmlFor={field.name}>
        {props.label}
      </label>
      <input
        {...field}
        {...props}
        placeholder={props.placeholder}
        autoComplete="off"
        className={`border bg-gray-50 font-semibold text-sm ${
          meta.touched && meta.error
            ? "border-red-600 focus:border-red-600 bg-red-50"
            : "border-gray-900 focus:border-green-600 focus:bg-green-100"
        } py-3 px-2 focus:outline-none  transition`}
      />

      <ErrorMessage
        name={field.name}
        className="text-sm text-red-500 font-semibold"
        component="span"
      />
    </>
  );
};

export default TextField;
