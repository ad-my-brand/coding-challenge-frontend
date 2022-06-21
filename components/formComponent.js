import React,{useEffect,useState} from 'react'
import { fetchData } from '../utils/fetchData'
import { Autocomplete } from '@react-google-maps/api'

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
  }).map((data)=>{return data.address.geo})
 
  console.log((Data[0]))
  setFilter(Data[0])
 }


const handleChange=(e)=>
{
  setId(e.target.value)
  filterData();
}




  return (
    <form >
    <select onChangeCapture={(e)=>{
    handleChange(e)
    }} >{user.map((data)=>(<option key ={data.id} value={data.username}>{data.username}</option>))}</select>
    <button> submit</button>
    </form>
  )
}

export default formComponent