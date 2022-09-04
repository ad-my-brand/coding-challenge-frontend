import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Form.css";

export default class Formdetails extends React.Component {
  constructor() {
    super();
    this.state = {
      collection: [],
      selectedId: 0,
      title: "",
      body: "",
      lat:"233.3498",  //initial value
      lng:"930.3828"   //initial value
    };
  }
 
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }));
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClick = (e) => {
    this.setState({ selectedId: e.target.selectedIndex });
    this.setState({lat: this.state.collection[this.state.selectedId]?.address.geo.lat});
    this.setState({lng: this.state.collection[this.state.selectedId]?.address.geo.lng});
  };
  submitHandle = (e) => {
    e.preventDefault();
    window.alert('You have successfully created a post')
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
  };
 
  render() {
    return (
      <div>
        <Form className="justify-content-center container contain frm" onSubmit={this.submitHandle}>
        <h1 className="him">adMyBrand-Assesment</h1>
          <Form.Group as={Row}>
            <Col sm={8}>
            <select onChange={this.handleClick} className="deep" required>
    <option value="">--Please select a user --</option>
              {this.state.collection.map((item, index) => (
                <option key={index} value={item.id} required>
                  {item.username}
                </option>
              ))}
            </select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mrg"
            onChange={this.onChange}
            name="title"
          >
            <Form.Label column sm={2} className="pra">
              <strong className="color">Title</strong>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Type a suitable title"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }} required />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mrg"
            onChange={this.onChange}
            name="body"
          >
            <Form.Label column sm={2} className="pra">
            <strong className="color" >Body</strong>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter a body"
                value={this.state.body}
                onChange={(e) => {
                  this.setState({ body: e.target.value });
                }} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
          <Form.Label column sm={1}>
          <Button
            column
            sm={1}
            type="submit"
            className="button mrg"
          >
            Submit
          </Button>
            </Form.Label>
          </Form.Group>
          <br></br>
          <h1><strong className="color pra" >Location of a user:</strong></h1>
          <iframe className="bd shadow mrg1" src={`https://maps.google.com/maps?q=${this.state.lat},${this.state.lng}&hl=es;&output=embed`} id="iframeId" height="500px" width="70%">
        </iframe>
        </Form>
      </div>
    );
  }
}