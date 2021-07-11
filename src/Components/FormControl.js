import React,{useEffect, useState} from "react";
import Location from "../Components/Location";
import axios from "axios";


export const FormControl = () => {
  const [user, setUser] = useState([]);
  const [userid, setUserId] = useState("");
  const [title, setTitle] = useState(" ");
  const [body, setBody] = useState(" ");

  const submit = (e)=> {
    e.preventDefault();
    
    if(!title || !body || !userid){
      alert("Name, Title and Body Cannot be Empty")
    } else{
      const postData = {
        title,
        body,
        userid,
      };
      axios.post('https://jsonplaceholder.typicode.com/posts',postData)
      .then((response)=>{
        console.log(response);
       
      })
      setTitle("");
      setBody("");
      setUserId("");
    }
  }

 
const getUser = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  setUser (await response.json());
  
}
  useEffect(() => {
    getUser();
  },[]);

  return(
    <>
    <form onSubmit={submit}>
    <div className="container my-3">
     <center> <h1> Form Control </h1> </center>
     <div className="mb-3">
     <label htmlFor="name" className="form-label"><h3>Name</h3></label>
     <select className="form-select" aria-label="Default select example" value={userid} onChange={(e)=>{setUserId(e.target.value)}}>
     <option  disabled value="">Choose Name...</option>
        {
         user.map((elem, index)=>{
           return(
             <>
              <option key={index} value={elem.id}>{elem.name}</option>
             </>
           )
          })
        }
        </select>
    </div>
      </div>
    <div className="container mb-3" >
    <label htmlFor="title" className="form-label"><h3>Title</h3></label>
    <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
  </div>

  <div className="container mb-3">
  <label htmlFor="body" className="form-label"><h3>Body</h3></label>
    <input type="text" className="form-control" id="body" value={body} onChange={(e)=>{setBody(e.target.value)}} />
  </div>


  <div className=" container mb-3">
    <center><button type="submit" className="btn btn-outline-success">Submit</button></center>
  </div>
  </form>
  <Location />
    </>
  )
}

export default FormControl;
