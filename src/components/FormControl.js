import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';


import useStyles from './styles';

const FormControl = () => {
  const [formData, setFormData] = useState({ id: '', name: '', age: '', message: '', city: ''});
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const clear = () => {
    setFormData({ id: '', name: '', age: '', message: '', city: '' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name === '' || formData.age === '' || formData.message === '' || formData.city === '') {
        alert('Please enter all fields')
    }
    else{
        setData(formData);
        clear();
        setOpen(true);
    }
    }


  return (
    <>
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">Form</Typography>
        <TextField name="id" variant="outlined" label="Id" fullWidth value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
        <TextField name="name" variant="outlined" label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <TextField name="age" variant="outlined" label="Age" fullWidth value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
        <TextField name="city" variant="outlined" label="City" fullWidth value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    {
    open && <Paper>
        <h3>id: {data.id}</h3>
        <h3>name: {data.name}</h3>
        <h3>age: {data.age}</h3>
        <h3>message: {data.message}</h3>
        <h3>city: {data.city}</h3>
        </Paper>
}
    </>

  );
};

export default FormControl;