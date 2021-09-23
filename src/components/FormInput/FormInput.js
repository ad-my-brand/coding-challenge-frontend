import React,{useRef, useImperativeHandle} from 'react';
import './FormInput.css';

const FormInput = React.forwardRef(({label,error,errorMsg, ...inputProps},ref) =>{
    const inputRef = useRef();

    useImperativeHandle(ref, ()=> {
        return{
            focus: inputRef.current.focus(),
            value: inputRef.current.value
        }
    })
    return(
        <>
           <div className={`inputControls ${error ? "invalid" :""}`}>
               <label>{label}</label>
               <input ref={inputRef} {...inputProps}/><br/>
           </div>
           <div className="error">{error ? errorMsg: ""}</div>
        </>
    )
})

export default FormInput;