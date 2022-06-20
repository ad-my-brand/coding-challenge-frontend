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

  return (
    <form >
    <select onChange={(e)=>{console.log(e.target.value)}} >{user.map((data)=>(<option key ={data.id} value={data.username}>{data.username}</option>))}</select>
    <button> submit</button>
    </form>
  )
}

export default formComponent