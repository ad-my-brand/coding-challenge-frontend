import React from 'react';
import {useState,useEffect} from 'react';
import Axios from 'axios';
import '../styles/formControl.css';

function FormControl(props){
    
    const [users,setUsers] = useState([]);
    const [msg,setMsg] = useState("");
    const url = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
       Axios.get(url)
       .then( (response) => {
         setUsers([...response.data]);
       })
       .catch(err => ( console.log(err) ));
    },[]);

    function showUser(user){
      return (
          <label className="user" key={user.id}>
          <input type="radio" value={user.name} id={user.id} name="user" className="radioBtn" onChange = {props.changeMapCenter} lng = {user.address.geo.lng} lat = {user.address.geo.lat} required/>
          {user.name}
          </label>
      )
    }

    function submitResponse(evt){
      evt.preventDefault();
      const postUrl = "https://jsonplaceholder.typicode.com/posts";

      const radioBtn = document.querySelector('input[name="user"]:checked');
      const reqObj = {
        title: "foo",
        body: "far",
        userId: radioBtn.id
      }
      Axios.post(
        postUrl,reqObj
      )
      .then((response) => {
        setMsg("Succesfully submitted the response!");
        setTimeout( () => ( setMsg("")),2000);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Submit failed, try again!");
        setTimeout( () => ( setMsg("")),2000);
      })
      radioBtn.checked = false;
      props.setCenter();
    }

    return (
      <div className='formDiv'>
        <h2 className='formTitle'>Select a user</h2>
        <form onSubmit = { submitResponse }>
            <div className='users'>
               {users.map(showUser)}
            </div> 
            <button type="submit" className='submitBtn'>Submit</button>
        </form>
        {msg !== "" && <div className='msg'>{msg}</div>}
      </div>
    )
}

export default FormControl;