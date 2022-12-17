import { useState } from 'react'
import { useEffect } from 'react'
import FormControl from './components/FormControl'
import EmbeddedMap from './components/EmbeddedMap'

function App() {

  const [userData, setUserData] = useState([])
  const [error, setError] = useState('')
  const [data, setData] = useState({ Name: "", Title: "", Body: "", address: {}, id: "" })

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(response => setUserData(response))
  }, [])

  function handleChange(e, label) {
    setData(currData => {
      return {
        ...currData,
        [label]: e.target.value
      }
    })
    if (label === "Name") {
      for (let i = 0; i < userData.length; i++) {
        if (e.target.value === userData[i].username) {
          setData(currData => {
            return {
              ...currData,
              address: userData[i].address,
              id: userData[i].id
            }
          })
          break
        }
        else {
          setData(currData => {
            return {
              ...currData,
              address: {},
              id: ''
            }
          })
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (JSON.stringify(data.address) === '{}') setError('User not Registered')
    else if (data.Title === "") setError('Title cannot be empty')
    else if (data.Body === "") setError('Body cannot be empty ')
    else {
      let post = {
        'title': data.Title.toString(),
        'body': data.Body.toString(),
        'userId': data.id
      }
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then(response => response.json()).then(e=> console.log(e))
      .catch(error => console.error('Error:', error))
    }
  }
  return (
    <form className="App row gx-2 gy-3" onSubmit={handleSubmit}>
      {error !== "" && <p style={{ color: "red" }} >{error}</p>}
      <FormControl
        handleChange={handleChange}
        label={"Name"}
        value={data.Name}
      />
      <FormControl
        handleChange={handleChange}
        label={"Title"}
        value={data.Title}
      />
      <FormControl
        handleChange={handleChange}
        label={"Body"}
        value={data.Body}
      />
      <input className='btn btn-outline-success col-3' type="submit" value="Submit" />
      {JSON.stringify(data.address) != "{}" && <EmbeddedMap address={data.address} />}
    </form>
  )
}

export default App
