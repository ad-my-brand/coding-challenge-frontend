import React, { useState } from 'react';

const FormControl = ({ label, validationFunc, errorMessage, onChange, children }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setError(validationFunc(inputValue) ? '' : errorMessage);
    onChange(inputValue);
  };

  return (
    <div>
      <label>{label}</label>
      <input className='form-input' type="text" value={value} onChange={handleInputChange} />
      {children}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormControl;
