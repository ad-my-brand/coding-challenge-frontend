import React from 'react'
import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const PostForm = () => {

    

    const [formData, setFormData] = useState({ title: '', body: '',  userId: '' });
    const [user, setUser] = useState(null);

    const classes = useStyles();

    const clear = () => {
        setFormData({ title: '', body: '',  userId: '' });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.userId === '' || formData.title === '' || formData.body === '') {
            alert('Please enter all the fields to post the data')
        }
        else{
           await axios.post('https://jsonplaceholder.typicode.com/posts',formData)
           .then((response) => {
            setUser(response.data);
           })
        }
        }


    return (
        <>
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">Form</Typography>
        <TextField name="userId" variant="outlined" label="UserId" fullWidth value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextField name="body" variant="outlined" label="Body" fullWidth value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    {
        user && (
            <>
            <h1>New entry</h1>
            <p>id: {user.id}</p>
            <p>title: {user.title}</p>
            <p>body: {user.title}</p>
            <p>userId: {user.userId}</p>
            </>
        )
    }
    </>
  )
}

export default PostForm