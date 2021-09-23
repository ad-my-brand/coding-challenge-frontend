import React,{useContext, useState} from 'react';
import {Button} from 'react-bootstrap';
import FormInput from '../FormInput/FormInput';
import UserContext from '../../store/user-context';
import Card from '../Card/Card';

const UserForm = () =>{

    const ctx = useContext(UserContext);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    
    const [titleValidity, setTitleValid] = useState(true)
    const [bodyValidity, setBodyValid] = useState(true)
    const [userValidity, setUserValid] = useState(true)

    const validateHandler = (inputs) =>{
       if(inputs.toString().trim().length>0)
        return true;
       else
        return false; 
    }

    const onResetHandler = () =>{
        setBody("");
        setTitle("");
        ctx.resetUserDetails();
        setTitleValid(true);
        setBodyValid(true);
        setUserValid(true);
    }

    const onChangeHandler = (event, type) =>{
        if(type==="title"){
          setTitleValid(true)
          setTitle(event.target.value)
        }
        if(type==="body"){
          setBodyValid(true)
          setBody(event.target.value)
        }    
    }
    const submitHandler = async(event) =>{
         event.preventDefault();
         if(validateHandler(title) && validateHandler(body) && validateHandler(ctx.username))
          {
            console.log("All clear")
            const userData = {
              id:ctx.userId,
              title:title,
              body:body
            }
            try{
              const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method:'POST',
                body: JSON.stringify(userData),
                headers: {
                  'Content-Type' : 'application/JSON'
                } 
              })  
              if(response.ok)
                window.alert("Data added successfully")
              onResetHandler();
            }
            catch(e){
                window.alert("Error in Posting ",e)
            }
          }     
          else {
            if(!validateHandler(title))
            setTitleValid(false)
            if(!validateHandler(body))
            setBodyValid(false);  
            if(!validateHandler(ctx.username))
            setUserValid(false);  
            else
            setUserValid(true);
          }
    }
    return(
      <Card>
          <h3>User Form</h3>
          <form onSubmit={submitHandler} >
            <FormInput 
                label="Username" 
                type="text"
                value={ctx.username} 
                error={ (userValidity || ctx.username)? false : true}
                errorMsg="Please select a user!"
                placeholder="Select a user"
                readOnly/>
            <FormInput 
                label="Title" 
                type="text" 
                value={title}
                onChange={(e)=>onChangeHandler(e,"title")}
                error={!titleValidity}
                errorMsg="Empty Title!"
                placeholder="Enter title"/>
            <FormInput 
                label="Body" 
                type="text" 
                value={body}
                onChange={(e)=>onChangeHandler(e,"body")}
                error={!bodyValidity}
                errorMsg="Empty Body!"
                placeholder="Enter body"/>
            <Button type="submit" style={{margin:"1rem 0",width:"100%"}}>Post</Button>
            <Button variant="warning" onClick={onResetHandler} style={{margin:"1rem 0",width:"100%"}}>Reset</Button>
          </form>  
       </Card>
            
    )
}
export default UserForm;