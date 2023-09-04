import React from 'react';

const FormControl = ({ label, name, value, onChange, validation }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className={`w-full border border-gray-300 p-2 rounded focus:outline-none ${validation() ? 'border-red-500' : 'focus:border-blue-500'
                    }`}
            >
                <option value="">Select an option</option>
                {/* Populate options here */}
            </select>
            {validation() && <p className="text-red-500 mt-1">{validation()}</p>}
        </div>
    );
};

export default FormControl;
