import React, { useState } from "react";

import classes from './Form.module.css'

function Form({label, validation}){

    const [isValid, setIsValid] = useState(false);

    const onValidate = (event) => {
        setIsValid(validation(event))
    }

    let inputField = null;

    if(label === "title"){
        inputField = (
            <div className={classes.Title}>
                <label htmlFor={`${label}`}>Title</label><br/>
                <input onChange={onValidate} required type = "text" name={`${label}`} maxLength="25" id = "titleInput"/><br/>
                { isValid && (<span>*Mandatory to fill this field</span>)}
            </div> 
        )
    }

    else if(label === 'body'){
        inputField = (
            <div className={classes.Body}>
                <label htmlFor={`${label}`}>Body</label><br/>
                <textarea onChange={onValidate} required type = "text" name={`${label}`} maxLength="250" id = "bodyInput"/><br/>
                { isValid && (<span>*Mandatory to fill this field</span>)}
            </div>
        ) 
    }

    return inputField
}

export default Form;
