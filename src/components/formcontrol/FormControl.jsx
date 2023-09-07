import React, { useEffect, useState } from 'react';
import "./formControl.css"


function FormControl({
    label,
    type = "text",
    options = [],
    value = '',
    onChange,
    validationFunc,
    errorMessage = '',
    isSubmitted,
    onValidation,
    ...props
}) {



    let inputElement = null;
    const [isValid, setIsValid] = useState(true)   // state to track the validity of each input element


    // Tracking values of input & on every change we run the validaiton function and set the validation status for that element
    useEffect(() => {
        if (validationFunc) {
            const currentIsValid = validationFunc(value);
            setIsValid(currentIsValid);
            if (onValidation) {
                onValidation(props.name, currentIsValid);
            }
        }
    }, [value]);


    // TO RENDER A SPECIFIC INPUT ACCORDING TO PROVIDED TYPE 
    switch (type) {
        case 'text':
            inputElement = <input type="text" value={value} onChange={onChange} {...props} />;
            break;

        case 'select':
            inputElement = (
                <select value={value} onChange={onChange} {...props}>
                    <option value="">--- None ---</option>
                    {options[0] && options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = <input type="text" value={value} onChange={onChange} {...props} />;
    }



    return (
        <div className="form-control">
            {label && <label>{label}</label>}
            {inputElement}

            {/* Only show errormsg when the user has pressed the submit button at least once (Prevents onload validations) and is the validation is false */}
            {isSubmitted && !isValid && <p className="error-text">{errorMessage}</p>}
        </div>
    );
}

export default FormControl;