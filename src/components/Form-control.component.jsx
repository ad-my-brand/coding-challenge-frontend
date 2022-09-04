import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form  from "react-bootstrap/Form";
import axios from 'axios'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './Form-control.styles.css'


export default class Formpage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: [],
        selectedId: 0,
        title: "",
        body: "",
        lat:"270.173884",
        lng:"785.5748300"
      };
  };
  


    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response=> response.json())
          .then((res) => {
            this.setState({ collection: res })
          })
          .catch(error=>console.log(error));
        }

    onChange= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = (e) =>{
      
        this.setState({selectedId: e.target.selectedIndex });
        this.setState({lat: this.state.collection[this.state.selectedId].address.geo.lat});
        // console.log(this.state.collection[this.state.selectedId]?.address.geo.lat);
        this.setState({lng: this.state.collection[this.state.selectedId].address.geo.lng});
        // console.log(this.state.collection[this.state.selectedId]?.address.geo.lng);
       
        
    };

    submitHandle = (e) => {
        e.preventDefault();
        axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            userId: this.state.selectedId,
            title: this.state.title,
            body: this.state.body,
          })
          .then((response) => {  
          console.log(response);
        })
         .catch((error) => {
            console.log(error);
          });
          alert("Post is submitted successfully")
      };

     
      

    render() {
        return (
       
            <div className="center padded bd">
            <Form onSubmit={this.submitHandle}>
            <Form.Label className="font" as={Col}><h1>Coding Challenge Frontend (ADmyBRAND)</h1></Form.Label>
            <Form.Label className="font" as={Col}><h4>Select a user</h4></Form.Label>
            <select className="input bd2"  onChange={this.handleClick} required>
            <option value="">Select a user</option>
              {this.state.collection.map((item, index) => (
                <option key={index} value={item.id} loc={item.address.geo}>
                   {item.username}
                </option>
              ))}
            </select>
            
            <Form.Label as={Col}><h5 className="font">Title</h5></Form.Label>
            <input className="input bd" type="text" placeholder="Enter title"
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }} required />
            
            
            <Form.Label className="" as={Col}><h5 className="font">Body</h5></Form.Label>
            <input className="input shadow bd" type="textarea" placeholder="Enter body"
            value={this.state.body}
            onChange={(e) => {
              this.setState({ body: e.target.value });
            }} required />
          <div as={Col} className="padded10 mg-4">
            <Button
            
            sm={2}
            type="submit"
            className="rounded-pill button" >
            Submit
          </Button>
          </div>
            <div className= "pb10 padded10">
            <Form.Label className="" as={Col}><h5 className="font">User location</h5></Form.Label>
          <iframe className="bd shadow" src={`https://maps.google.com/maps?q=${this.state.lat},${this.state.lng}&hl=es;&output=embed`} id="iframeId" height="500px" width="70%"></iframe>
            </div>
           </Form>
           <div className="ar">
          Task completed by Ayush Prakash Pandey
        </div>
        </div>
       
        )
    }
}