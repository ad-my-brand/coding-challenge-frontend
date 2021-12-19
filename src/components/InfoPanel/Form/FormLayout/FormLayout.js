import React, {useEffect, useState} from "react";
import classes from './FormLayout.module.css'
import Form from "../Form";
import axios from "axios";


function FormLayout(props){

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");

    const onTitleChangeHandler = (event) => {
        setTitle(event.target.value);

        return event.target.value === "";
    }

    const onBodyChangeHandler = (event) => {
        setBody(event.target.value);

        return event.target.value === "";
    }
    
    const showFormHandler = () => {
        const temp = showForm;
        setShowForm(!temp);
        setSubmitMessage("")
    }

    const submitHandler = () => {
        const id = props.user.id;
        const item = {title, body, id};

        axios.post("https://jsonplaceholder.typicode.com/posts", item)
            .then(res => console.log(res.data))

        if(title !== "" && body !== ""){
            setTitle(null);
            setBody(null)
            showFormHandler();
        }

        else{
            setSubmitMessage("*Please fill the above field.")
        }

        document.getElementById("titleInput").value = "";
        document.getElementById("bodyInput").value = "";

    }

    return(
        <div className={classes.MessageContainer}>
            
            <div className={classes.Message}>
                <p style={{fontWeight : "400"}}>Want to send a message?</p>
                <p 
                    className={classes.p1}
                    onClick={showFormHandler}>Message</p>
            </div>
        
            <div 
                className={classes.Form}
                style = {{
                    transform : showForm ? 'translateX(0)' : 'translateX(-50vw)',
                }}>

                <h4>Message</h4>
                <Form label = "title" validation = {onTitleChangeHandler}/>
                <Form label = "body" validation = {onBodyChangeHandler}/>

                <div className={classes.ButtonContainer}>
                    <button onClick={showFormHandler}>Back</button>
                    <div>
                        <button onClick={submitHandler}>Submit</button>
                        <p>{submitMessage}</p>
                    </div>
                </div>
            
            </div>
    </div>
    )
}

export default FormLayout;
