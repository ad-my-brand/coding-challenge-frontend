import React, { useState } from 'react'
import "./style/FormStyle.css"
function FormControl() {
  // const [user, setUser] = useState([])
  // const handleUser =()=>{
  //  try {
  //   fetch("https://jsonplaceholder.typicode.com/users").then((result)=> result.json()).then((res)=>{
  //     console.log(res)
  //     setUser(res)
  //    })
  //  } catch (error) {
  //   alert(error)
  //  }
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({});
  const apiGet = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  };


  const apiPost = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: inputs.title,
        body: inputs.body,
        userId: parseInt(inputs.userId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,

      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apiPost();
    console.log(inputs);
     alert("form Submitted successfull")
  };


  
  return (
    <>
      <div className="first-head">
      <h1>Form for AD-MY-BRAND</h1>
      </div>
   
    <div className='container' >
      
      <form action="">
        <select name="" id="" onClick={apiGet} >
        <option value="" >select user</option>
        {
          data.map((item)=> <option key={item.id} > {item.name} </option>)
        }
        </select>
       <div className="title">
        <span>Title</span><br />
        <input  className='placeholder' type="text" name='title' placeholder='Enter the title' onChange={handleChange} />
       </div>
       <div>
       <span className = "title" >userId</span><br />
       <input  className='placeholder' type="number" name="userId" placeholder="userId" onChange={handleChange} />
       </div>
       <span className='title' >Body</span>
        <div className="body">
          <textarea className='placeholder' name="body" id="" cols="80" rows="5" placeholder='body' ></textarea>
        </div>
        <button className='submit' onClick={handleSubmit} >Submit</button>
      </form>
    
    </div>
    </>
  )
}

export default FormControl