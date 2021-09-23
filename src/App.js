import React from 'react';
import WrappedMap from './components/Map/Map';
import UserForm from './components/Form/Form'
import './App.css';

const App = () =>{
  const APIkey ="AIzaSyDvqyM5GIDCWmDG3p2cUGdJVhRhMEgMQX0";
  return(
    <div className="App">
        <div className="Map">
           <WrappedMap 
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIkey}`} 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}/>
        </div>
        <div className="Form">
          <h2>USERS</h2>
          <UserForm/>
        </div>
        
    </div>
  )
}

export default App;