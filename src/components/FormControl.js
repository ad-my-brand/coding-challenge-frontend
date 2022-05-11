import React from 'react'

const FormControl = ({ label, isValid, id }) => {
  if (isValid)
  return (
    <option key={id} value={id}>{label}</option>
  )
  else {
    alert('500 : INTERNAL SERVER ERROR, NO USERS LOADED')
    return(<></>)
  }
  
}

export default FormControl