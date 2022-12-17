import React from "react"


function FormControl(props) {
    return (
        <div className="col-6">
            <label htmlFor={props.label} >{props.label}</label>
            <br />
            <input
                type="text"
                name={props.label}
                id={props.label}
                value={props.value}
                onChange={e => props.handleChange(e, props.label)}
            />
        </div>
    )
}


export default FormControl