import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const BlogForm = () => {

    // States
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState();
    const [infos, setInfos] = useState([])
    const [titleError, setTitleError] = useState('')
    const [bodyError, setBodyError] = useState('')
    const [authorError, setAuthorError] = useState('')
    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState('')

    // Fetch data
   useEffect(() => {
    const fetchData = async () =>{
        const response = await fetch('https://jsonplaceholder.typicode.com/users').catch(error => console.log(error));
        const data = await response.json();
        setInfos(data)
    }

    fetchData();
    }, [])

    // Validation Function
    const validate = () =>{
        let titleError =''
        let bodyError =''
        let authorError =''

        // Title Error
        if(!title){
            titleError='Please fill in a title'
        }
        if(!body){
            // Body Error
            bodyError='Please fill your message here'
        }
        if(!userId){
            // Body Error
            authorError='Please select a user'
        }

        if(titleError || bodyError || authorError){
            setTitleError(titleError);
            setBodyError(bodyError);
            setAuthorError(authorError);
            return false;
        }
        
        return true
    }
   

    // Submit Function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const isValid = validate() 
        if (isValid) {
            setPending(true)

            // Send POST
            const blog = {title, body, userId}

            let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(blog),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })

            if (res.status === 201) {
                setMessage("User created successfully");
                setPending(false)
                setTitle('')
                setBody('')
                setUserId('')
                setTitleError('')
                setBodyError('')
                setAuthorError('')
                // setMessage('')
            } else {
                setMessage("Some error occured");
                setPending(true)
            }
        }             

    }    
    
    // Google Maps
    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
      })
    
      const [map, setMap] = useState(null)
    
      const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])
    
      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])

    const [location, setLocation] = useState([])
    const [locationText, setLocationText] = useState('')
       


  return (
    <div className='form-section'>
        <div className="form-container">
            <h1>Add a new Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Blog Title:</label>
                    <input type="text" value={title} id='title' onChange={(e) => setTitle(e.target.value)}  />
                </div>
                <p className='error'>{titleError}</p>
               <div className='input-group'>
                    <label htmlFor="body">Blog body:</label>
                    <textarea id='body' value={body} onChange={(e) => setBody(e.target.value)}  ></textarea>
               </div>
               <p className='error'>{bodyError}</p>
                <div className='input-group'>
                    <label htmlFor="author">Blog author:</label>
                    <select id="author" value={userId} onChange={(e) => {setUserId(e.target.value);}}>
                        <option>---Select User---</option>
                        {infos.map(info => (
                            <option key={info.id} value={info.id}>{info.name}</option>
                        ))}
                    </select>
                </div>
                {/* Map */}
                {/* <div id="map">
                    {infos.map(info =>{
                        if(userId && info.id){
                            setLocation(info.address.geo)
                            setLocationText(info.address.city)
                        }
                        return isLoaded ? (
                            <GoogleMap
                                key={info.id}
                                mapContainerStyle={containerStyle}
                                center={location}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <Marker position={location} />
                            </GoogleMap>
                        ) : null
                    })}
                </div> */}
                <p className='error'>{authorError}</p>
                {!pending ?  <button type='submit'>Add Blog</button> :  <button disabled type='submit'>Adding Blog...</button>}
                <p className = {!pending ? 'success' : 'error'}>{message}</p>
            </form>
        </div>
    </div>
  )
}

export default BlogForm;