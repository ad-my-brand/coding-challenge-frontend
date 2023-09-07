// import React, { useState } from 'react';

// const CustomFormControl = ({ label, validationFn, value, onChange }) => {
//   const [error, setError] = useState('');

//   const handleInputChange = (event) => {
//     const newValue = event.target.value;
//     onChange(newValue);
//     // Validate the input value
//     const validationResult = validationFn(newValue);
//     setError(validationResult);
//   };

//   return (
//     <div>
//       <label>{label}</label>
//       <input
//         type="text"
//         value={value}
//         onChange={handleInputChange}
//       />
//       {error && <div className="text-red-500">{error}</div>}
//     </div>
//   );
// };

// export default CustomFormControl;

import React, { useState } from "react";

const CustomFormControl = ({ label, validationFn, value, onChange }) => {
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    setError(validationFn(newValue));
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor="inputField">
        {label}
      </label>
      <input
        type="text"
        id="inputField" 
        name={label} 
        value={value}
        onChange={handleInputChange}
        className={`border rounded p-2 w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <div className="text-red-500 mt-2" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomFormControl;
