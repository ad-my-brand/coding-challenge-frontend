import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import FormControllInput from './FormControllInput'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link as Scroll} from 'react-scroll';
import Map from './Map';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormHelperText, Grid, FormControl, Typography, Alert, Collapse, IconButton } from '@mui/material';

const Form = () => {
    
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState({isError: false, errorMsg: ""});
    const [bodyError, setBodyError] = useState({isError: false, errorMsg: ""});
    const [selectedUser, setSelectedUser] = useState("select");
    const [userError, setUserError] = useState("");
    const [alert, setAlert] = useState({type: "success", message: ""});
    const handleInputChange = (event, type)=>{

        if(type == "Title"){
            setTitle(event.target.value);
            if(event.target.value.length === 0){
                setTitleError({isError: true, errorMsg: "Please enter a value for TITLE"});
                return;
            }
            setTitleError({isError: false, errorMsg: ""});
            
        }else if(type == "Body"){
            setBody(event.target.value);
            if(event.target.value.length === 0){
                setBodyError({isError: true, errorMsg: "Please enter a value for BODY"});
                return;
            }
            setBodyError({isError: false, errorMsg: ""});
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = async ()=>{
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            console.log(res);
            //Fetching results from the API was successful
            if(res.status === 200){
                setUsers(res.data);
                console.log("Users is ", users);
            }else{
                //Some error has happened
                setAlert({type: "error", message: "Couldn't fetch Users!!"});
                setOpen(true);
            
            }
           

        } catch (error) {
            //Something is wrong, so acknowledge
            setAlert({type: "error", message: "Something went wrong, couldn't fetch the users!!"});
            setOpen(true);
            
        }
        
    }
    const handleUsersChange = (event)=>{
        setSelectedUser(event.target.value);
        if(event.target.value === "select"){
            setUserError("Please select the user");
            return;
        }
        setUserError("");
        console.log(event.target.value);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        let post = true;
        if(title.length == 0){
            post = false;
            setTitleError({isError: true, errorMsg: "Please enter a value for TITLE"});
        }else{
            console.log("Title is " + title);
            setTitleError({isError: false, errorMsg: ""});
        }
        if(body.length == 0){
            post = false;
            setBodyError({isError: true, errorMsg: "Please enter a value for BODY"});
        }else{
            console.log("Body is " + body);
            setBodyError({isError: false, errorMsg: ""});
        }
        if(selectedUser ===  "select"){
            post = false;
            setUserError("Please select the user");
        }else{
            setUserError("");
        }
        //Make a post request only when there are no errors
        if(post === true){
            const data = {
               title, body, userId: selectedUser.id
            }
            try {
                const res = await axios.post('https://jsonplaceholder.typicode.com/posts', data, { withCredentials: true});
                console.log(res);
                if(res.status === 200 || res.status === 201){
                    setAlert({type: "success", message: "Successfully posted the data!!"});
                    setOpen(true);
                }else{
                    setAlert({type: "error", message: "Something went wrong, couldn't post the data!!"});
                    setOpen(true);
                }
            } catch (error) {
                console.log("Error");
                setAlert({type: "error", message: "SOMETHING went wrong, couldn't post the data!!"});
                setOpen(true);
            }
        }
       
    }
    return (
        <div>
         <Collapse in={open}>
        <Alert
            severity={alert.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      </Collapse>
        <div style={{marginLeft: '2%', marginTop: "3%"}}>
           
            <div style={{textAlign: 'center'}}>
            <Typography variant="h1" gutterBottom>Sample JSON</Typography>
            </div>
              <Grid container spacing={2} display="flex" justifyContent="space-evenly" alignItems="center">
              
            <form  style={{border: "3px solid black", backgroundColor: "#B5DEFF", padding: "10%"}} noValidate onSubmit={(event)=>handleSubmit(event)}>
            {
                    users.length === 0 ? <Typography variant="h4">No users found</Typography>:
              <Grid container spacing={2}>
                
                    <>
                    <Grid item xs={12} sm = {4}>
                    <FormControl fullWidth error={userError.length !== 0}>
                        <Scroll to="gmap" smooth offset = {2090}>
                        <Select
                        fullWidth
                        value={selectedUser}
                        color="secondary"
                        onChange={handleUsersChange}
                >
                  
                             <MenuItem value={"select"}>Select User</MenuItem>
                        {
                            users.map((user, key)=>{
                                return <MenuItem key={key} value={user}>{user.name}</MenuItem>
                            })
                        }
                    

  </Select>
  </Scroll>
  {
      userError.length > 0 && <FormHelperText style={{color: "red"}}>Please select a user</FormHelperText>
  }
  
  </FormControl>
  </Grid>
                    </>
                
                <Grid item xs={12} sm ={4}>
                    <FormControllInput label="Title" isError={titleError.isError} errorMsg={titleError.errorMsg} handleInputChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm ={4}>
                    <FormControllInput label="Body" isError={bodyError.isError} errorMsg={bodyError.errorMsg} handleInputChange={handleInputChange} />
                </Grid>
                
                <Grid item xs={12} sm ={12}>
                    <Button variant="contained" type="submit" fullWidth>Submit</Button>
                    
                </Grid>
                
                </Grid>
}
            </form>
         

            </Grid>
            <div  id="gmap" style={{marginTop: "2%", marginBottom: "5%"}}>

          
            {
                    selectedUser !== "select" 
                    &&
                    <Map lat={parseFloat(selectedUser.address.geo.lat)} lng={parseFloat(selectedUser.address.geo.lng)} />
            }
              </div>
        </div>
        </div>
    )
}

export default Form
