import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import callApi from "../../User";
import GoogleMap from "../GoogleMap/GoogleMap";
import './FormControl.css'
const FormControl= ()=>{
  const [dataToSubmit,setDataToSubmit]=useState({
    name:"",
    title:"",
    body:""
  })
  const [coordinates,setCoordinates]=useState({ lat: "28.644800", lng: "77.216721"})
  const [users,setUsers]=useState([])
  const [response,setResponse]=useState({})
  const [isActive,setIsActive]=useState(false)
  const selectData=(e)=>{
    const {value,name}=e.target
    console.log(name);
    console.log(value);
    if(name==="name"){
      for(let i=0;i<users.length;i++){
        if(users[i].name===value){
          setCoordinates(users[i].address.geo);
          console.log("form control")
          console.log(users[i]);
          console.log(coordinates)
          setDataToSubmit((prevState)=>{
            console.log(users[i].id);
            return{...prevState,[name]:value,userId:users[i].id}

          })
          break;
        }
      }
    }else{
      console.log(dataToSubmit)
      setDataToSubmit((prevState)=>{
        return {
            ...prevState,
            [name]:value
        }
        
    })
    }


  }
  const onSubmit=(e)=>{
    e.preventDefault();
    if(dataToSubmit.name===""){
      alert("please select name")
      return false;
    }else if(dataToSubmit.name==="select the user name"){
      alert("please select name")
      return false;
    }else if(dataToSubmit.title===""){
      alert("please enter title")
      return false;
    }else if(dataToSubmit.body===""){
      alert("please enter body")
      return false;
    }
    else{
      setIsActive(true)
      let url="https://jsonplaceholder.typicode.com/posts"
      fetch(url,{
        method:"post",
        body:JSON.stringify({title:dataToSubmit.title,body:dataToSubmit.body,userId:dataToSubmit.userId}),
        headers:{
            'Content-Type':'application/json'
        }
      }).then(res=>{
        res.json().then(result=>{setResponse(result); console.log(result); setIsActive(false)})
      }).catch(e=>{setResponse(e);console.log("error");setIsActive(false)})
    }
  }
  const api=async()=>{
    try {
      let res= await callApi();
      console.log(res)
      setUsers(res)
      
    } catch (error) {
      alert("you internet connection is lost or might be this website is down")
    }
    
  }
  useEffect(() => {
    api();
  },[]);
   
    return(<>
    
    <h1 className="heading">Task of SUD Goyal</h1>
    <div className="container" >

  <form className="form" >
<select name="name" onChange={selectData} value={dataToSubmit.name} className="form-select" aria-label="Default select example">
  <option>select the user name</option>
 {
  users.map((user)=>{
   return <option  key={user.id}>{user.name}</option>
  })
 }
   
</select>
{(dataToSubmit.name===''||dataToSubmit.name==='select the user name')?<div className="alert alert-danger" role="alert">
  please select user
</div>:''}

<div className="mb-3 title">
  <label htmlFor="title" className="form-label">Tittle</label>
  <input name="title" className="form-control" id="title"onChange={selectData} value={dataToSubmit.title} ></input>
</div>
{(dataToSubmit.title==='')?<div className="alert alert-danger" role="alert">
 please enter title
</div>:''}
<div className="mb-3 body">
  <label htmlFor="body" className="form-label">Body</label>
  <textarea name="body" onChange={selectData} value={dataToSubmit.body} className="form-control" id="body"></textarea>
</div>
{(dataToSubmit.body==='')?<div className="alert alert-danger" role="alert">
 please enter body
</div>:''}
<input type='submit'  disabled={isActive} onClick={onSubmit}/>
    </form>
   
    <GoogleMap  coordinates={coordinates}/>
    </div>
    <div className="mb-3 response" >
  <label htmlFor="response" className="form-label">Response</label>
  <textarea name="response" onChange={()=>{}} value={JSON.stringify(response)} className="form-control" id="response"></textarea>
</div>
    </>)
}

export default FormControl