import React, { useState } from 'react';
import '../styles/Form.css'

const FormControl = ({ label, validation, errorMessage, onChange }) => {
  const [val, setVal] = useState('');
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const newVal = e.target.value;
    setVal(newVal);
    setErr(validation(newVal) ? '' : errorMessage);
    onChange(newVal);
  };

  return (
    <div className="form-user-input">
      <label>{label}</label>
      <input type="text" value={val} onChange={handleChange} />
      {err && <p className="error-msg">{err}</p>}
    </div>
  );
};

export default FormControl;