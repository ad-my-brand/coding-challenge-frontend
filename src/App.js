
import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NetworkHelp from './NeworkHelp'
import Maps from './maps';
import { useJsApiLoader } from '@react-google-maps/api';
import Alert from 'react-bootstrap/Alert';



function App(props) {
  const { isLoaded } = useJsApiLoader({
    id :'google-map-script',
    googleMapsApiKey: "AIzaSyDRV_QjIzWOBdx619vSdamJQnT-ReTqqz4"
  })
  let op = 0
  const init = { title: "", body: "", userId: -1 }
  // const [user, setUser] = useState([])
  const [data, setData] = useState(init)
  const [send, setSend] = useState(false)

  const userWarning = useRef("plsss")




  useEffect(() => {
    console.log("Updated values", data)
    let x = document.getElementById("select-user-warning")
    x.innerHTML = ""
  }, [data])

  // 



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

    // console.log("Previous values",data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Sending data.....")
    // while posting data handlesubmit will go in background with event and causing event.preventDefult not gonna happen
    await axios.post("https://jsonplaceholder.typicode.com/posts", data)
      .then(res => {
        console.log("Response recieved from jsonplaceholder", res.data)
        setSend(true)
        setData(init)        
        document.getElementsByName('user')[0].value = "--User"        
        let x = setTimeout(()=>{setSend(false);clearTimeout(x)},3000)        
      })
      .catch(err => {
        console.log(err)
        if (window.performance.navigation.type == 1) {
          window.location.reload(false);
        }
      })
  }


  const valid = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // set another if to  check userId === -1
    // raaise error Select user
    if (data.userId == -1) {
      document.getElementById("select-user-warning").innerHTML = "Please Select User"
      userWarning.current.focus();
      return
    }
    for (var i = 0; i < document.getElementById('form').length; i++) {
      if (e.target[i].name === "body" || e.target[i].name === "title") {
        if (e.target[i].value == "" || data.userId == -1) {
          e.target[i].focus()
          console.log("Empty fields ", e.target[i].name)
          return
        }
      }
    }
    
    op = 1
    console.log("Form validated!!")
    
    handleSubmit(e)
  }


  return (

    <>
      <div className="App col-lg-6 col-sm-12 col-md-8" aria-label='Form'>


        <form onSubmit={valid} id="form" className='form m-4  p-3'>
          <h3 className='m-0 p-3' >User Application</h3>

          <label className='d-flex flex-column m-0 p-0'>

            <select name='user' ref={userWarning} className='form-select' onChange={(e) => { setData({ ...data, userId: e.target.selectedIndex }) }} defaultValue="--User">
              <option value="--User" disabled>--Select User</option>
              {(props.length !== 0) && (props.user.map((ele) => {
                return (<option key={ele.id} value={ele.id} >{ele.name}</option>)
                // console.log(ele)
              }))
              }
            </select>
            <div className="text-danger fs-6 fw-bold d-inline-flex  m-0 p-0" id="select-user-warning" ></div>

          </label>
          {
            (data.userId !== -1) && isLoaded?<Maps  location={props.user[data.userId].address.geo} />:<></>
          }

          <input data-cy="title" type="text" required className='form-control' name='title' value={data.title} onChange={handleChange} placeholder="Title" />
          <textarea data-cy="body" name='body' required className='form-control' value={data.body} onChange={handleChange} placeholder="Body" />
          <button data-cy="submit" name='Submit' className='btn btn-dark fs-5' >Submit</button>
        </form>

      </div>
      {send && (
        <Alert id='alert' variant="success" style={{ opacity: data.userId }} className='successAlert p-2'>
          <Alert.Heading >
            Data sent successfully!!
          </Alert.Heading>
        </Alert>
      )}
    </>
  );
}

export default NetworkHelp(App);
