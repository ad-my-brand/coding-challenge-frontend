import React, { useState,useEffect } from 'react'
import axios from 'axios'
import GetLabel from './components/getLabel';
import './App.css';

function App() {
  const[userList,setUserList]=useState()
  const [user,setUser] = useState({});
  const [title,setTitle]=useState();
  const [body,setBody]=useState();
  const [errorMsg,setErrorMsg]=useState()
  const [submitSuccessAlert,setSubmitSuccessAlert]=useState(false)
  const [submitFailAlert,setSubmitFailAlert]=useState(false)

  useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((res) => setUserList(res.data.map((item) => ({ 
        id: item.id, 
        name: item.name,
        location:item.address.geo }))));
        
	}, []);

  const finalSubmitHandler= (e)=>{
    e.preventDefault();
    try{
      setSubmitSuccessAlert(false)
      if (!Object.keys(user).length) throw new Error('Please Select A User!');
      if (!title) throw new Error('Please Enter A Valid Title');
      if (!body) throw new Error('Please Enter A Valid Body');
      setErrorMsg('')
      axios
      .post("https://jsonplaceholder.typicode.com/posts/", {
        userId: user.id,
        title,
        body,
      })
      .then(() => {
        setErrorMsg('');
        setSubmitSuccessAlert(true)
        setUser({});
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        setSubmitFailAlert(true);
      });
      }
    catch(e){
        setErrorMsg(e.message)
      }

	};
  
  
  const validationHandler = (item)=>{
      try {
        if(!item) throw new Error('Please choose a user');
      }
      catch(err){
        return err.message;
      }
  }
  const userValueSetHandler=(val)=>{
    
    userList.every((item)=>{
      
      if(item.id===val){ 
        setUser(item)
        return false;
      };
      return true;
    })
  }
  const titleSetter =(e)=>{
 
    setTitle(e.target.value)
  }
  const bodySetter = (e)=>{
    setBody(e.target.value)
  }
  const closeAlertBox=(e)=>{
    setErrorMsg('')
    setSubmitSuccessAlert('')
    setSubmitFailAlert('')
  }
 

  return <div>
    {
      userList?<GetLabel 
          item={user} 
          itemList={userList} 
          itemValueSetter = {userValueSetHandler}
          validator={validationHandler}
          messageIfError ='Please choose a user'
          />:'loading..'
    }
    <div className='formAndMapWrapper'>
    <div className='mapWrapper'>
    {/*  MAP DISPLAY -------------------------------- */}
     { Object.keys(user).length?<iframe  
      data-testid='frame'
      title='User location on map'
      width="100%"
      height="100%"
      loading="lazy"
      allowfullscreen
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlmy2wq4EyEz9mw9YRSN8auAuev5KtjJs
      &q=${user.location.lat}%2C${user.location.lng}&zoom=15`}>
    </iframe>:<h3>Select a user to see Map</h3>}
    </div>
     
  {/* Main Page form jsx------------------------------------ */}
    <form onSubmit={e=>finalSubmitHandler(e)} className="allFormWrapper">
      
      <div className = 'formTitle'>
        <label>Title</label> 
        <input type='text' name = 'title' value={title} onChange={e=>titleSetter(e) } placeholder="title"/>
      </div>
      <div className ='formBody'>
        <label> Body</label> 
        <input type='text' name= 'body' value={body} onChange={e=>bodySetter(e)} placeholder="body"/>
      </div>
      <button className='formButton'>Submit</button>
{/* Alert Messages jsx -------------------------------------*/}
    {errorMsg?<div className='entryErrorBox'>
      <h3>{errorMsg}</h3>
      <div className='close-message' onClick={e=>closeAlertBox(e)}> <h5>Close</h5></div>
     </div>:''}
    {submitSuccessAlert?<div className='entryErrorBox green'>
      <h3>You have made a successful submision!!</h3>
      <div className='close-message' onClick={e=>closeAlertBox(e)}> <h5>Close</h5></div>
     </div>:''}
    {submitFailAlert?<div className='entryErrorBox'>
      <h3>We are having server issues,try sometime later.</h3>
      <div className='close-message' onClick={e=>closeAlertBox(e)}> <h5>Close</h5></div>
     </div>:''}
   
    </form>
    </div>

   
  </div>
  
     
  
}

export default App;
