import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "./Form";
import validationStyles from "../styles/Validation.module.css";

export const FormControl = ({ label, validation, error }) => {
  const { form, setForm, users, center, setCenter, submit, setSubmit } =
    useContext(FormContext);

  const [touched, setTouched] = useState(false);
  const [fieldValue, setFieldValue] = useState(null);

  const HandleChange = (e) => {
    setFieldValue(e.target.value);
    setForm({ ...form, id: e.target.value });
    const lat = Number(users[e.target.value - 1].address.geo.lat);
    const lng = Number(users[e.target.value - 1].address.geo.lng);
    setCenter([lat, lng]);
  };

  const HandleClick = (_) => {
    if (!touched) setTouched(true);
  };

  useEffect(() => {
    if (submit) {
      if (!fieldValue) {
        setTouched(true);
        setSubmit(false)
      }
    }
  }, [submit]);

  return (
    <>
      <select
        className="form-control mb-2"
        aria-label="Default select example"
        onChange={HandleChange}
        onClick={HandleClick}
      >
        <option selected disabled value={null}>
          {label}
        </option>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
      {validation(touched, fieldValue) && (
        <p className={validationStyles.errorMessage}>{error}</p>
      )}
    </>
  );
};
