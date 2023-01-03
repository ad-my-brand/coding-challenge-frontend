import React, { HTMLInputTypeAttribute, useState } from 'react'
import _ from 'lodash'
import  Style  from '../styles/Home.module.css'

function  FormControl(props:{
    lable:string,
    type:HTMLInputTypeAttribute,
    onChange:Function,
    validate:Function
  }){
  const valid =props.validate
  const [check,setCheck] =useState(valid())  
  const handleChange= (event:React.ChangeEvent)=>{
    props.onChange(event);
    setCheck(valid())
  }
  return (
    <div className={Style.Field}>
      <label className='FormLable'>{props.lable}</label>
      <input 
        className='FormInput'  
        type={props.type}
        name={_.camelCase(props.lable)} 
        required
        onChange={handleChange}
      ></input>
      {(check.isValid)?(<div style={{color:"red"}}>{check.errorMessage}</div>):null}
    </div>
  )
}

export default FormControl