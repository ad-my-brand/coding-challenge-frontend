import React,{useEffect,useState} from 'react'
import { fetchData } from '../utils/fetchData'


const formComponent = () => {
  
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchUserData= async()=>{
      const userData = await fetchData('https://jsonplaceholder.typicode.com/users');
      setUser(userData);
    }
     
    fetchUserData();
    
}, [])

const handleSubmit=()=>{

}

console.log(user);
  return (
    <form>
    <select>{user.map((data)=>(<option key ={data.id} value={data.username}>{data.username}</option>))}</select>
    <input type='submit'/>
    </form>
  )
}

export default formComponent