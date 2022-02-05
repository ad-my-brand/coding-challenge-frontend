import { useState } from "react"

const Select = ({users}) => {
  console.log(users)
  const [userIdvalue, setUserIdvalue]= useState('')
  const [latValue, setLatvalue]= useState('')
  const [lngValue, setLngvalue]= useState('')

  const getUserIdval=(event)=>{
    console.log(event)
    setUserIdvalue(event.target.value)
    setLatvalue(event.target.getAttribuite("data-lat")*1)
    setLngvalue(event.target.getAttribuite("data-lng")*1)
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