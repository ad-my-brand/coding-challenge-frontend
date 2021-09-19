import axios from 'axios';
import React, { Component } from 'react';
import "./SignUp.css"

class SignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            datas: [],
            name : "",
            address:""
        }
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
            // console.log("the res is ", res);
            this.setState({ datas: res.data });
            // console.log(this.state.datas);
        })
    }
    onChange(e){
        // e.preventDefault();
        this.setState({name:e.target.value});
        let name = this.state.name;
        if(name.length > 0)
             console.log(this.state.name);
    }

    takeAdd(e){
       this.setState({address:e.target.value});

    }

    sendData(){
        let name = this.state.name;
        let address = this.state.address;

        axios.post(`https://jsonplaceholder.typicode.com/posts`, {"name":name, "address":address});
    }

    render() {
        let datas = this.state.datas;
        return (
            <form>
                <h2>SignUp</h2>
                <div className="name-div">
                    <label>Name</label> <br></br>
                    <input type="text" className="name" placeholder="Enter your name" list= "cars" onChange = {(e)=>this.onChange(e)}></input>
                    <datalist id="cars">
                        {
                            datas.map((data)=>{
                                return( <option value={data.name} />)
                            })
                        }
                    </datalist>
                </div>

                <div className="location-div">
                    <label>Location</label> <br></br>
                    <input type="text" className="location" placeholder="Enter your location" list="city" onChange = {(e)=>{this.takeAdd(e)}}></input>
                    <datalist id="city">
                        {
                            datas.map((data)=>{
                                return( <option value={data.address.city} />)
                            })
                        }
                    </datalist>
                </div>

                <button className="submit" onSubmit={this.sendData}>Submit</button>
            </form>


        );
    }
}

export default SignUp;