import { useState } from "react";
import axios from 'axios';
import { FormControl } from "../components/FormControl";

const fetchData = async () => await axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => ({
    error: false,
    users: res.data,
  }))
  .catch((er) => {
    console.log('there us an error')
    console.log(er)
  }   
);

export default function Home({users}) {  
  console.log(users)
  // const [errorDiv, setErrorDiv]= useState([])
  const [errorinTitle, setErrorinTitle]= useState(false)
  const [errorinBody, setErrorinBody]= useState(false)
  const [errorinId, setErrorinId]= useState(false)
  // const validationFunction=(tag)=><p>Please select a {"tag"}</p>
 
  const handleSubmit=(event)=> {
    setErrorinTitle(false)
    setErrorinBody(false)
    setErrorinId(false)
    event.preventDefault();
    const data = new FormData(event.target);
    const [title,body, userId]= [data.get('title'), data.get('body'), data.get('userId')]
    console.log(userId)
    if (title==''){
      setErrorinTitle(true)
    }
    if (body==''){
      setErrorinBody(true)
    }
    if (userId==null){
      setErrorinId(true)
    }
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // })
}
  return (
    
    <form onSubmit= {handleSubmit}>
      <FormControl label='name' kind="select" users={users} error={errorinId}/>
      <FormControl label="title" error={errorinTitle}/>
      <FormControl label="body" error={errorinBody}/>
      <FormControl label="submit" type="submit"/>
    </form>
  )
}
export async function getServerSideProps()  {
  // console.log('yesnsbddww')
  const data = await fetchData();
  console.log("here now")
  // console.log({data})
  return {
    props: {users:data},
  };
}
