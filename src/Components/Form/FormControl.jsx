import "./FormControl.css"
import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Map from "../GoogleMaps/Map";

export default function Form() {
  
    let [post, setPost] = useState([]);
    let [err, setErr] = useState(false);

//For Recruiter Notice. I didn't use Required attribute in input tag. I introduced this state in this code for better UI.

    let [newUser, setUser] = useState([]);
    let [newTitle, setTitle] = useState([]);
    let [newBody, setBody] = useState([]);
  
    var handleError = ()=>{
      (newUser.length === 0 || newTitle.length === 0 || newBody.length === 0)?setErr(true):setErr(false);
    }

    var handleSumbit = function(e){
          e.preventDefault();
          handleError();
            try{
            if(newUser.length > 0 && newTitle.length > 0 && newBody.length > 0){
              axios.post("https://jsonplaceholder.typicode.com/posts",{ //Post Request
                title : newTitle,
                body: newBody,
                userId: newUser
              }).then(res=>{ console.log(res.data)})

//For Recruiter Notice. This print Statement placed here for Verification purpose 

            }
            }
            catch(e){
              console.log("Error from PostMethod");
              console.log(e);
            }
      }
 
      useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/users").then(res=> setPost(res.data)).catch(error => console.log(error)) },[]);
      //Get Request.
 
     
  return (
    <>
      <div className='formComponent'>
          <h1 className="formHead">Demo ADmyBrand Form</h1>
          <form action="" className='userFrom' onSubmit={handleSumbit}>
          {err&&newUser.length <=0?<small className="err1">*Plese Select the User</small>:"" }
          <div className='selectUser'>
            <select name="" id="user" className="user" value={newUser} onChange={e=>{setUser(e.target.value);} }>
                <option value="" hidden>Select User</option>
                {post.map((p)=>(
                  <option value={p.id}>{p.name}</option>
                ))}
            </select>
          </div>
          {err&&newTitle.length<=0 ?<small className="err2">*Plese Enter the Title</small>: ""}
          <div className="titleDiv">
          
            <input type="text" name="" id="title" value={newTitle}  onChange={e=>{setTitle(e.target.value);}}/>
            <span>Title</span>
          </div>
          {err&&newBody.length <=0 ?<small className="err3">*Plese Enter the Content</small>:""}
          <div className="bodyDiv">
            <textarea name="" id="body" rows={5} value={newBody} onChange={e=>{setBody(e.target.value);}}/>
            <span>Content</span>
          </div>
          <button type="submit" className="formSubmit">submit</button>
          </form>
      </div>
  
      </>
         )
}
