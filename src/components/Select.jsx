import { useState } from "react"

const Select = ({users}) => {
  // console.log(users)
  const [userIdvalue, setUserIdvalue]= useState('')
  const [latValue, setLatvalue]= useState('')
  const [lngValue, setLngvalue]= useState('')

  const getUserIdval=(event)=>{
    const selected_option=document.querySelectorAll('option')
    // console.log(selected_option)
    selected_option.forEach(option => {
      if (option.value==event.target.value) {
        // console.log(option, 'yes')
        setLatvalue(option.getAttribute("data-lat")*1)
        setLngvalue(option.getAttribute("data-lng")*1)
      }
    });
    setUserIdvalue(event.target.value)
  }
  return (
    <>
      <select name="userId" defaultValue={userIdvalue} onChange={getUserIdval}>
            <option hidden disabled value=''> --  select an option -- </option>
            {users.map((user,i)=> 
                <option value={user.id} key={i} data-lat={user.geo.lat} data-lng={user.geo.lng}>{user.name}</option>
            )}
      </select>
    </>
  )
}

export default Select;  