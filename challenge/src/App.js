import { useState,useEffect } from "react";
import FormControl from "./FormControl.js";
import Map from "./Map.js"

function App() {

  //MONITORING SUBMISSION STATUS
  const [isSubmitted,setIsSubmitted] = useState(false)

  // used to monitor changes and to control 
  const [formData,setFormData] = useState({
    userId: "",
    title: "",
    discription: "",
    name: "default",
    location: {
      lat:28.7041,
      lng:77.1025
    }
  })
  

  // used to check if any field of form not fill correctly
  const [errors,setErrors] = useState({})
  // API ERRORS 
  const [apiErrors,setApiErrors] = useState(null)
  
  // users data
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>{
      if(!response.ok){
        throw Error("could not fetch the data")
      }
      return response.json()
    })
    .then(data=>setUsers(data))
    .catch((error) => {
      setApiErrors(error.message)
    })
  },[])

  // handling the changes in form
  function handleChange(event) {
    const {name,value} = event.target
    if(name==="userId"){
      if(!value){
        setFormData(previousValue=>({
          ...previousValue,
          [name]:value,
          name: "default",
          location: {
            lat:28.7041,
            lng:77.1025
          }
        }))
        return
      }
      const selectedUser = users.find(user=>user.id==value)
      const userLat = +selectedUser.address.geo.lat
      const userLng = +selectedUser.address.geo.lng
      const userName = selectedUser.name
      setFormData(previousValue=>({
        ...previousValue,
        [name]:value,
        name: userName,
        location: {
          lat: userLat,
          lng: userLng
        }
      }))
      return
    }
    setFormData(previousValue=>({
       ...previousValue,
       [name]: value 
    }))
  }

  // handling the submit 
  function handleSubmit(event) {
    event.preventDefault()
    setErrors({
      user: !formData.userId,
      title: !formData.title,
      discription: !formData.discription
    })
    if(formData.userId && formData.title && formData.discription){

      const data = {
        userId: formData.userId,
        title: formData.title,
        body: formData.discription 
      }

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        setIsSubmitted(true)
      })
      .catch((error) => {
        setApiErrors(error.message)
      });
      setFormData({
          userId: "",
          title: "",
          discription: "",
          name: "default",
          location: {
            lat:28.7041,
            lng:77.1025
          }
      })
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {apiErrors && <p>{apiErrors}</p>}
        <label htmlFor="users">
          Select user:
        </label>
        <FormControl users={[...users]} value={formData.userId} onChange={handleChange}/>
        {errors.user && <p className="error">Please select a user</p>}
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>
        {errors.title && <p className="error">Please type a title</p>}
        <label htmlFor="body">Discription:</label>
        <input type="text" name="discription" id="body" value={formData.discription} onChange={handleChange}/>
        {errors.discription && <p className="error">Please type a discription</p>}
        <button type="submit" className="submitButton">Submit</button>
        {isSubmitted && <p className="responseText">Response submitted</p>}
      </form>
      <div className="item1">
        <Map location={formData.location} name={formData.name}/>
      </div>
    </div>
  )
}

export default App;