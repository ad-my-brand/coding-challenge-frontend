import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style.css';

import GoogleMapReact from 'google-map-react';
import axios from 'axios';



const FormControl = () => {

    const [data, setData] = useState([]);
    // const [geoData, setGeoData] = useState({});
    const [inputVal, setInputVal] = useState({
        id: '',
        title: '',
        body: ''
    });

    //Get Data from Api and Store into State
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const myData = response.data;
                setData(myData);
                // console.log(myData);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);


    // POST request
    const postData = (event) => {

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            userId: inputVal.id,
            title: inputVal.title,
            body: inputVal.body
        }).then(res => console.log('Posting Data', res)).catch(err => {
            console.log(err);
            alert(err);
        });
        event.preventDefault();
    }


    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputVal({ ...inputVal, [name]: value });
    }

    // const geos = data.filter(geo => geo.id === inputVal.id)[0];
    // console.log(geos);
    // console.log(inputVal.id);
    // console.log(inputVal.id);




    const coordinates = { lat: 24.8918, lng: 21.8984 };

    return (
        <>
            <div className="container" style={{ height: '600px' }}>

                <div className="row mt-5 h-100">
                    <div className="col-5 form-box">
                        <form>
                            <div class="mb-3">
                                <select class="form-select" name='id' required="true" value={inputVal.id} onChange={handleOnChange}>
                                    <option selected>Select the user name</option>
                                    {data.map((username) => <option value={username.id}>{username.name}</option>)}
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" onChange={handleOnChange} value={inputVal.title} name='title' class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Body</label>
                                <input type="text" onChange={handleOnChange} value={inputVal.body} name='body' class="form-control" />
                            </div>
                            <button onClick={postData} class="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <div className="col-7 map-box">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyB0KqrblqPLODmOVyL3bs6zFQZKnFzyKnM' }}
                            defaultCenter={coordinates}
                            center={coordinates}
                            defaultZoom={3}
                            margin={[50, 50, 50, 50]}
                        >

                        </GoogleMapReact>
                    </div>


                </div>
            </div>
        </>
    );
}




export default FormControl;