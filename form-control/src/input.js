import React, { useState } from "react";

const Input = () => {
    const[title, setTitle] = useState("");
    const[body, setBody] = useState("")
        
     const handleSubmit = () => {
        const Link = 'https://jsonplaceholder.typicode.com/posts';
         let data = {title, body};
            fetch(Link, {
                method : "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
               res.json().then(result => {
                   console.log('result', result)
               })
            }) 
                
     }

     const clear= () => {
         setTitle('')
         setBody('')
     }

    return (
        <div className= 'form'>
         <form>
         <label>Title: <input type= "text" name= "title" value= {title} onChange= {(e) => {setTitle(e.target.value)}} placeholder= 'title' /></label>
         <label>Body: <input type= "text" name= "body" value= {body}  onChange= {(e) => {setBody(e.target.value)}} placeholder= 'body' /></label>
         <div className= 'btn'>
         <button onClick= {handleSubmit} type= 'button'>Submit</button>
         <button type= 'reset' className= 'clr' onClick= {clear}>Reset</button>
         </div>
        </form>
      </div>
    )
}

export default Input;