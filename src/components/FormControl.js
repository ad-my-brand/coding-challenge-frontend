import React from 'react'
import { useState } from 'react'
const FormControl = ({label,validationFunction,ErrorMessage,callbackFunction}) => {

    const [input,SetInput] = useState("");
    const [error,setError] = useState("");


  return (
    <div className='form-field'>
    <span>{error}</span>
    <label htmlFor="input" className='form-label'>{label}</label>
    <input 
    id='input' 
    type="text" 
    className='form-control'
    onChange={(e) => {SetInput(e.target.value)}}
    onClick ={(e) => {
        console.log("OnClick Form Control",validationFunction(input))
        if(validationFunction(input) === true)
        {
            callbackFunction(input);
        }
        else{
           setError(ErrorMessage);
        }
        
    }}
    />
    </div>
  )
}

export default FormControl