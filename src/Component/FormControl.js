import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMap from "./GoogleMap";

const FormControl = () => {
    const initialState = { userId:"", title:"", body:"" }

    const [formValues, setfromValues] = useState(initialState);
    const [formErrors, setformErrors] = useState({});
    const [userData, setuserData] = useState([]);
    const [responsemsg,setresponsemsg]=useState("");

    const handleChange = (e) => {
        setfromValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const submitForm =async (e) => {
        e.preventDefault();
        setformErrors(validate(formValues));
        console.log(formErrors)

        if (formValues.userId && formValues.title && formValues.body) {
            console.log('error not found');    
            const user= (JSON.stringify(formValues))
            console.log(user)
            await axios.post('https://jsonplaceholder.typicode.com/posts',user)
                .then(result => { console.log(result) 
                    setresponsemsg("Data post successfully")
                    alert("Data post successfully")
                })
                .catch(error => {
                    console.log(error.message)
                    setresponsemsg(error.message)
                    alert(error.message)
                })
        }
        else {
            console.log('error found')
        }

    };
    const validate = (values) => {
        const errors = {};


        if (!values.userId) {
            errors.userId = "Please select a user";
        }
        if (!values.title) {
            errors.title = "Title is required";
        }
        if (!values.body) {
            errors.body = "Body is required";
        }
        return errors;
    };




    const getdata = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setuserData(response.data);

        } catch (errors) {
            console.log(errors)
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="container">
            <div className="formcontrol">
                <div className="formcontrol__form">
                    <h1 className="formcontrol__title">Form Control</h1>

                    <form onSubmit={submitForm} >

                        <label htmlFor="selectuser" className="formcontrol__label">User<span>*</span></label><br />
                        <select value={formValues.userId} id="user" onChange={handleChange} name="userId">
                            <option value="none">Select User</option>
                            {
                                userData.map((e) => {
                                    return (
                                        <option value={e.id}>{e.name}{e.id}</option>
                                    )
                                })
                            }

                        </select>
                        <p className="formcontrol__error">{formErrors.userId}</p>



                        <label htmlFor="title" className="formcontrol__label">Title <span>*</span></label>
                        <input type="text" name="title" id="title" className="formcontrol__input" value={formValues.title} onChange={handleChange} />
                        <p className="formcontrol__error">{formErrors.title}</p>



                        <label htmlFor="body" className="formcontrol__label">Body<span>*</span></label>
                        <input type="text" name="body" id="body" className="formcontrol__input" value={formValues.body} onChange={handleChange} />
                        <p className="formcontrol__error">{formErrors.body}</p>


                        <button type="submit" className="btn">Submit</button>
                    </form>
                    {
                        responsemsg?(
                            <div className="formcontrol__responsemsg"><span>{responsemsg}</span></div>
                        ):(
                            <div></div>
                        )
                    }
                    
                    
                    <div className="formcontrol__map">
                        <GoogleMap lat='20.705331' lng= '77.22112'/>
  
                    </div>
                    
                </div>
                <div className="formcontrol__image">
                    <img src="../images/form.png" alt="not found" width="100%" height="100%"  />
                </div>

            </div>
        </div>
    )
}
export default FormControl;
