import logo from './logo.svg';
import { GoogleMap,Marker,useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import React, {useState, useEffect} from 'react';
import './App.css';



function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  //const [lat, setLat] = useState(24.8918);
  //const [lng, setLng] = useState(21.8984);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyA9meVsADwCpL0VQKMOJWffQjZUTDVP_Q8",
  });
  


  const [users, setUsers] = useState([]);
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then((response) => response.json())
         .then((data) => {
            //console.log(data);
            setUsers(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   const center = useMemo(() => ({ lat: 24.8918, lng: 21.8984 }), []);



  let submitForm = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: id
        }),
      });
      
      if (res.status === 201) {
        setBody("");
        setTitle("");
        setId("");
        console.log("Posted successfully!");
      }
      else {
        console.log("Error");
      }
    }
    catch (err) {
      console.log("Error");
    }
  };
  return (
    <><div>
      <header className="App-header" >
          Form 101
        <img src={logo} className="App-logo" alt="logo"/>
      
      
        
        <form id="myform" onSubmit={submitForm}>
        
          <label placeholder='Please select a user'  required>
            <select>

              {users.map((user) => {
                return (
                  <option value={id} onChange={(e)=>{setId(e.target.value)
                    /*; setLat(user.lat);setLng(user.lng)*/}} key = {user.id}>
                      {user.name}
                      </option>
                );
              })}

            </select>
          </label>
          
          <br />
          <input name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' required />
          <br />
          <br />
          <textarea name="body" value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Body' required />
          
      <br />

          <br />
          <button type="submit">Submit</button>
          


        </form>
        
        
        <div className="App1">
      {!isLoaded ? (
        <h1>Loading...Please be patient!</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={7}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
        
      )}
    </div>
    </header>
      </div></>
  
  );
}


export default App;

