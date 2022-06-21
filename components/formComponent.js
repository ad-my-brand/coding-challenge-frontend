import React,{useEffect, useState} from 'react'
import { fetchData } from '../utils/fetchData'
import Axios from 'axios'

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
   
   const latitude = Data.map((data)=>{return data.lat})
   const longitude = Data.map((data)=>{ return data.lng})
   latitude[0] = parseFloat(latitude[0]);
   longitude[0] = parseFloat(longitude[0]);
   console.log(latitude[0],longitude[0])
  setFilter({lat:latitude[0],lng:longitude[0]})
 }


const handleChange=(e)=>
{
  setId(e.target.value)
  filterData();
}

const url='https://jsonplaceholder.typicode.com/posts'

const [Title, setTitle] = useState([])
const [Body, setBody] = useState([])


const handleTitle =(e)=>{
  const data=e.target.value
  setTitle(data);
}
const handleBody =(e)=>{
  const data=e.target.value
  setBody(data);
}
const handleSubmit= async (e)=>{
   e.preventDefault();
   const userdata={title:Title,body:Body,userId:1}
   await Axios.post(url,JSON.stringify(userdata)).then(result=>console.log(result))
}

  return (
    <form onSubmit={handleSubmit}>
    <select onChange={(e)=>{
    handleChange(e)
    }} ><option>Please select</option>
      {user.map((data)=>(<option key ={data.id} value={data.username}>{data.username}</option>))}</select>
      <input type='text' placeholder='tilte' id="title" onChange={(e)=>handleTitle(e)} />
      <input type='text' placeholder ='body' id='body' onChange={(e)=>handleBody(e)} />
      <button type='submit' >submit</button>


    </form>
  )
}

export default formComponent