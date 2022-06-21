import React from 'react'
import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const FetchForm = () => {

  const [formData, setFormData] = useState({ id: ''});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [la, setLa] = useState(0);
  const [lo, setLo] = useState(0);
  const [city, setCity] = useState('');
  const classes = useStyles();
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9847b125f1msh33d9ed93df3b8e1p10b11bjsnddfcd9bd619c',
      'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
    }
  };

  const clear = () => {
    setFormData({ id: ''});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.id === '' || formData.id < 1 || formData.id > 10) {
        alert('Please enter the valid id to fetch the data')
    }
    else{
       const { id } = formData;
       await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
       .then((response) => {
        setUser(response.data);
        setLa(response.data.address.geo.lat);
        setLo(response.data.address.geo.lng);
       })
       await axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        setUsers(response.data);
       })
      
      await fetch(`https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?lat=${la}&lng=${lo}`, options)
       .then(response => response.json())
       .then(response => setCity(response.Results[0].address))
       .catch(err => console.error(err));
    }
    }
  return (
    <>
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">Form</Typography>
        <TextField name="id" variant="outlined" label="Id" fullWidth value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    <h1>Location based on latitude: {la} and longitude: {lo}</h1>
    <p>{city}</p>
    { user && <>
    <h1>The data of the user you want to fetch :-</h1>
    <p>{ user ? `Id: ${user?.id}` : ''}</p>
    <p>{ user ? `Name: ${user?.name}` : ''}</p>
    <p>{ user ? `Email: ${user?.email}` : ''}</p>
    <p>{ user ? `Phone: ${user?.phone}` : ''}</p>
    <p>{ user ? `Username: ${user?.username}` : ''}</p>
    <p>{ user ? `Website: ${user?.website}` : ''}</p>
    </>
   }
    {
     users.length>0 && 
     <>
     <h1>
      name of all 10 users
     </h1>
     {
    users.map((item) => (
       <p>name: {item.name}</p>
    ))
    }
    </>
    }
    </>
  )
}

export default FetchForm