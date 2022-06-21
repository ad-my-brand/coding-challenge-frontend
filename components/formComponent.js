import React,{useEffect,useState} from 'react'
import { fetchData } from '../utils/fetchData'


const formComponent = ({id,setId,setUser,user,setFilter}) => {
  

  useEffect(() => {
    const fetchUserData= async()=>{
      const userData = await fetchData('https://jsonplaceholder.typicode.com/users');
      setUser(userData);
    }
     
    fetchUserData();
    
}, [])


const filterData =()=>{
  const Data= user.filter((data)=>{
    return data.username===id
  }).map((data)=>{return [data.address.geo]})
 
  setFilter(Data)
 }


const handleChange=(e)=>
{
  setId(e.target.value)
  filterData();
}




  return (
    <form >
    <select onChange={(e)=>{
    handleChange(e)
    }} >{user.map((data)=>(<option key ={data.id} value={data.username}>{data.username}</option>))}</select>
    <button> submit</button>
    </form>
  )
}

export default formComponent