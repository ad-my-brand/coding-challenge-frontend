import { useState } from "react"
import Map from '../components/Map'

const Select = ({users}) => {
  console.log(users)
  // return <div>Nothing</div>
  const [userIdvalue, setUserIdvalue]= useState('')
  const [latValue, setLatvalue]= useState('')
  const [lngValue, setLngvalue]= useState('')

  const getUserIdval=(e)=>{
    setUserIdvalue(e.target.value)
    setLatvalue(e.target.getAttribuite("data-lat")*1)
    setLngvalue(e.target.getAttribuite("data-lng")*1)
  }
  return (
    <>
      <select name="userId" defaultValue={userIdvalue} onChange={getUserIdval(e)}>
            <option hidden disabled value=''> --  select an option -- </option>
            {users.map((user,i)=> 
                <option value={user.id} key={i} data-lat={user.geo.lat} data-lng={user.geo.lng}>{user.name}</option>
            )}
      </select>
      {lngValue && <Map lat={latValue} lng={lngValue}/>}
    </>
    

  )
}

export default Select;  