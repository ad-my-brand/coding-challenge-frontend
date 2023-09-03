import React, { useState } from 'react';
import '../pages/form.css'

const FormControl = ({ label, validation, errorMessage, onChange }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setError(validation(newValue) ? '' : errorMessage);
    onChange(newValue);
  };

  return (
    <div className="newdiv">
      <input type="text" value={value} onChange={handleChange} className='newinput' />
      <label className='newlabel'><span className='newspan'>{label}</span></label>
      {/* {error && <p className="para">{error}</p>} */}
    </div>
  );
};

export default FormControl;