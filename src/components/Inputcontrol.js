import React from "react";
import "../style/style.css"

function Inputcontrol({ heading,value,controlName,onChange,isSubmit}) {
  const   handleChange=(e)=>{
    const obj ={};
    obj[controlName] = e.target.value 
    onChange(obj )  
  }

  return ( 
      <div>
        <div className="mb-3">
          <label className="form-label">{heading}</label>
          <input
            type="text"   
            className={isSubmit&&!value?"invalid-control form-control":"form-control"}
            id="exampleFormControlInput1"
            value={value}
            onChange={ handleChange} 
            
          />

          { isSubmit&&!value ? <div className="invalid-feedback">
      Please provide a valid zip.
    </div> :''
            
          }
        </div> 
    </div>
  );
}

export default Inputcontrol;
