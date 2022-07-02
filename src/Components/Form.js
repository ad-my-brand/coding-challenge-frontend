import React, { useEffect, useState } from 'react';
import '../App.css'
import MapContainer from './MapContainer';


function Form() {
    const [data, setdata] = useState([]);
    const [location, setlocation] = useState(
        {
            lat: 28.6519500,
            lng: 77.2314900,
        });
    const [postdata, setpostdata] = useState({
        userId: 0,
        title: "",
        body: "",
    });


    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setdata(data);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])



    const OnChangeHandler = e => {
        
        setpostdata({
            [e.target.name]: e.target.value
        })
    };
    const OnChangeHandlerLocation = e => {
        var key = e.target.value - 1;
        setlocation({
            lat: +(data[key].address.geo.lat),
            lng: +(data[key].address.geo.lng),
        })       
    }

    const OnSubmitHandler = e => {
        e.preventDefault();

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(postdata)
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert(error);
            })
    }
    const url = "https://maps.google.com/maps?q="+location.lat+","+location.lng+ "&z=15&output=embed"
    return (
        <div className='Container'>
            <MapContainer url={url}/>
            <div className='formContainer'>
                <form>
                    <label htmlFor="users">Select A User:</label>

                    <select name="userId" id="userId" onChange={OnChangeHandlerLocation} defaultValue="">
                        <option disabled value=""> Select User </option>
                        {

                            data.map((user) => {
                                return (
                                    <option value={user.id} key={user.id}>{user.id} . {user.name} </option>
                                )
                            })
                        }
                    </select>

                    <input type="text" name='title' placeholder='Enter Title' onChange={OnChangeHandler} />
                    <input type="text" name='body' placeholder="Enter Body" onChange={OnChangeHandler} />

                    <button type="submit" onClick={OnSubmitHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form;