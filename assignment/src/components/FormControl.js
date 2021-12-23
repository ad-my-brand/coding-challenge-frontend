import React, {useEffect, useState} from 'react'
import { Map, Marker  } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'
import useForm from './useForm';
import ValidationMsg from './ValidationMsg';

const FormControl = () => {
    const { values, handleChange, handleSubmit, errors } = useForm(ValidationMsg)
    const [apiData, setapiData] = useState([]);
    const [modal, setModal] = useState(true);
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    const api = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        fetch(api)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setapiData(data);
        })
        .catch(err => {
            // console.log(err)
        })
    }, [])

    // console.log(apiData)

    return (
        <div className="container">
            <div className='form'>
                <form onSubmit={handleSubmit} method='post'>
                    {errors.global && <p className={`global ${errors.global}`}>Success</p>}
                    <div className='input-box'>
                        <label>Title</label>
                        <input 
                            type='text'
                            name='title' 
                            id='Title' 
                            placeholder='Enter the title'
                            value={values.title} 
                            onChange={handleChange} />
                            {errors.title && <span className='err'>{errors.title}</span>}
                    </div>
                    <div className='input-box'>
                        <label>Body</label>
                        <input 
                            type='text'
                            name='body' 
                            id='Body' 
                            placeholder='Enter the body'
                            value={values.body}
                            onChange={handleChange}/>
                            {errors.body && <span className='err'>{errors.body}</span>}
                    </div>
                    <div>
                        <button className='btn' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            <button className='btn show-users' onClick={()=>{setModal(true)}}>Show Users</button>
            {modal &&
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={()=> { setModal(false)}}>&times;</span>
                        <p>Fetched from : `{api}`</p>
                        <div className='card-stack row'>
                            {
                                apiData.map((data, key) => {
                                    return (
                                        <div key={data.id} className='col'>
                                            <div  className='card'>
                                                <Map className="map" provider={osm} height={200} defaultCenter={[data.address.geo.lng, data.address.geo.lat]} defaultZoom={11} animate={true}>
                                                    <Marker width={50} anchor={[data.address.geo.lng, data.address.geo.lat]} color={color} onClick={() => setHue(hue + 20)} />
                                                </Map>
                                                <div className="container">
                                                    <span>{data.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FormControl
