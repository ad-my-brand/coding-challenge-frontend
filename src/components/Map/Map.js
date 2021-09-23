import { useEffect, useState, useContext } from 'react';
import '../../App.css';
import UserContext from '../../store/user-context';
import {withScriptjs, withGoogleMap, GoogleMap, Marker}   from 'react-google-maps';

const Map = () =>{
    const ctx = useContext(UserContext);
    const [users,setUsers] = useState([])
    const [error,setError] = useState()
    let bounds = new window.google.maps.LatLngBounds();
    useEffect(async()=>{
        try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users',{
         method:"GET"
        });
        const data = await response.json();
        setUsers(data);
        users.map( user => {
            const point = new window.google.maps.LatLng(parseFloat(user.address.geo.lat),parseFloat(user.address.geo.lng) );
            bounds.extend(point);
        })
       }catch(e){
           setError(e)
           window.alert("Error ",e)
       }
    },[])
    return(
        users && !error &&
        <GoogleMap 
            defaultZoom={2} 
            defaultCenter={{ lat: -37.3159, lng:81.1496}}>
            {
                users.map(user=> <Marker 
                    key={user.id}  
                    position={{ lat: parseFloat(user.address.geo.lat) ,lng: parseFloat(user.address.geo.lng)}}
                    onClick={()=>
                        ctx.changeUserdetails(user.name,user.id)
                    }></Marker>)
            }
        </GoogleMap>

    )
}

export default withScriptjs(withGoogleMap(Map));