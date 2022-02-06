import React from "react";
import "../style/style.css"

function Selectcontrol({ options, onChange, controlName, isSubmit, value }) {
  const onSelect = (e) => {
    const obj = {};
    obj[controlName] = e.target.value;
    onChange(obj);
    console.log(e.target.value);
  };
  // console.log(options);
  return (
    <div className="col-md-3">
      <label className="form-label">Users</label>
      <select
        className={isSubmit && !value ?"invalid-control form-select":"form-select"}
        onChange={($event) => {
          onSelect($event);
        }}
      >
        <option value="">select</option>
        {options.map((el, index) => {
          return (
            <option value={el.id} key={index}>
              {el.name}
            </option>
          );
        })}
      </select>
      {isSubmit && !value ? (
        <div className="invalid-feedback">please select a user</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Selectcontrol;
