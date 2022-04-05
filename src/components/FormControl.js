import React, {useState, useEffect} from 'react'
import Map from './map/Map'
import './form.css'



const FormControl = () =>  {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState()
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  // const [geo, setGeo] = useState({})




  useEffect(async ()=> {
    const getUser =  async () => {
      await fetch('https://jsonplaceholder.typicode.com/users').then(d => d.json()).then(d => setUsers(d))
    }

    getUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
      
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "post", 
        body: JSON.stringify({title, body, userId})
      }).then(d => console.log(d))

  }


  return (
       <div className='form' >
    <form >
        <h2>Form Control</h2>

        <select onChange={e => setUserId(e.target.value)} value={userId}>
          {
            users.map(d => <option value={d.id}>{d.name}</option>)
          }
        </select> <br />
        
        <label htmlFor="body">Body:</label><br />
        <input type="text" id="body" name="body" value={body} onChange={e => setBody(e.target.value)}/><br />
        <label htmlFor="title">title:</label><br />
        <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)}/><br /><br />
        <button type='submit' onClick={handleSubmit}>Submit</button>

      </form>

      <Map lng={12} lat={12}/>
    </div>
    

  )
}

export default FormControl
