
import React, { useState,useEffect } from "react";
import "./form_style.scss"
import axios from "axios";
import MapLoc from "./MapLoc"
// import { info } from "node-sass";

const Formz = (props) => {
 const [message,setMessage]=useState('');
   const [valid,setValid]= useState('');
   const [msgValid,setMsgValid]=useState(false);
   const [touched,setTouched] = useState(false);
   const [show, setShow] = useState(false);
   const [alerts,setAlerts]=useState(false); 
   const[notEmpty,setNotEmpty] = useState(false)
   const[users,setUser]=useState();
   const [selectedUser,setSelectedUser]=useState(null);
   const [checkUser,setCheckUser]=useState(false);
   const [postInfo, setPostInfo] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const [formError, setFormError] = useState("");
  const[title,setTitle]= useState("");
   const inputBlurHandler= (e) => {
   setMessage(e.target.value)
     setTouched(true);
     if (message.trim() == '')
     { 
      
       setMsgValid(false)
       return;
     }

     setMsgValid(true);
     setNotEmpty(false);
   }
   const inputBlurHandlerTitle= (e) => {
    setTitle(e.target.value)
    setTouched(true);
    setNotEmpty(false);
   }
   const validCheck=(e) => {
     setMessage(e.target.value)
     setTouched(true);
     if (message.trim() =='')
     { 
       setMsgValid(false);
    
     }
     setMsgValid(true);
     setNotEmpty(false);
   }
   const validCheckTitle=(e) => {
    setTitle(e.target.value)
    setTouched(true);
    setNotEmpty(false);
  }

   const fetchDatas = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    const respn=response.data
    setUser(respn);
  
  };


 const updatingMsg = (e) =>  {  
   e.preventDefault();
   setTouched(true);

    setMessage(message)
  
   if (message.trim() == '')
   {
     setMsgValid(false)
     return;
  
   }
   setMsgValid(true);
   setNotEmpty(true);
   const urlNotification = "https://jsonplaceholder.typicode.com/users"

     const respn=axios.get(urlNotification)
     
        setUser(respn.data);
        console.log(respn.data);
 }
const prefferedUserName= (e) => {
setSelectedUser(e.target.value);
}

 const submitForm =  (e) => {
  e.preventDefault();
    try {
       axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body: message,
        userId: selectedUser
      });
    }
   catch(err)
  {
    console.log(err)
  }
};





     const inputBox = !msgValid && touched? "form-control invalid" : "form-control";
   return (
      <div className = "main">  
        <div className="mainHeadingContainer">
        </div> 
        <div className="mainContainer">
            <div className = "mainContainer__content">
                  <h1 className = "mainContainer__heading">Form</h1>
            <div className="form-size">
            <div className="whiteContainer">
                <button className="butns " id="butns" >
                
                </button>
            </div>
            <div title="Test" >
           
                  <form className= "form" onClick={fetchDatas} onSubmit={submitForm} >
                  <div
          className='d-flex flex-column border rounded p-3 bg-light me-3'
          style={{ width: '350px' }}
        >
          <h4>Please Select Name</h4>
         {checkUser && <small>Please Select Name</small>}
            <select
              name="field4"
              className={
                checkUser ? "form-select not-selected" : "form-select"
              }
              onChange={(e) => prefferedUserName(e)}
            >
              <option>
                Choose Name
              </option>
              {users && users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
        </div>
                 
                 
                 
                  <div>
                  <h4>Enter the Title</h4>
                      <input value={title} type="textarea" name="textValue" className={inputBox}  placeholder="Title message" 
                        onChange={validCheckTitle} onBlur={inputBlurHandlerTitle}></input>
                      {touched && !msgValid? (<p className="serifs">Please enter the Title</p>):null}
                      <br/>
                      <h4>Enter the content</h4>
              
                      <input value={message} type="textbox" className={inputBox}  placeholder="Notification message" 
                        onChange={validCheck} onBlur={inputBlurHandler}></input>
                      {touched && !msgValid? (<p className="serifs">Please enter the message</p>):null}
                      
                      <br/> 
                     
                      
             
                      
                    <div><MapLoc /></div>
                  </div>
                      <button className="submitBtn" id="submitBtn" type="submit"> Submit </button>
                       
                 
              
                    </form> 
            </div>
          </div> 
          </div>
       </div>
     </div>
    );
 };
 export default Formz;
