import './App.css';
import * as axios from "axios";
import React, { Component } from 'react';
import {Form,FormGroup,FormFeedback,Label,Input,Col,Button} from 'reactstrap';

class FormControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            touched: {
                title: false,
                body: false
            }
        };
           
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
      const target=event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name=target.name;

      this.setState({
          [name]:value
      });
    }

    handleSubmit(event) {
        event.preventDefault();
        const id=this.props.id;
        const title=this.state.title;
        const body=this.state.body;
        axios
        .post("https://jsonplaceholder.typicode.com/posts", {
        test: "HiFromIndia",
        Title: this.state.title,
        Body: this.state.body,
        })
        .catch((error) => {
        console.log(error.message);
        console.log({ id, title, body });
        alert(`Something went wrong - ${error.message}`);
        });    
        
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(title,body) {
        const errors = {
            title: '',
            body: ''
        };

        if (this.state.touched.title && title.length < 3)
            errors.title = 'Title should be >= 3 characters';
        else if (this.state.touched.title && title.length > 10)
            errors.title = 'Title should be <= 10 characters';

        if (this.state.touched.body && body.length < 5)
            errors.body = 'Body Text should be >= 5 characters';
        else if (this.state.touched.body && body.length > 50)
            errors.body = 'Body Text should be <= 50 characters';
        return errors;
    }

    render() {
        const errors = this.validate(this.state.title, this.state.body);

        return(
             
                <div>
                   <div className="container">
                    <div className="row row-content justify-content-center">
                        <div className="col-10 col-md-8 offset-md-3">
                            <h3>Validation Form</h3>
                        </div>
                        <br/>
                        <div className="col-10 col-md-8">
                           <Form onSubmit={this.handleSubmit}>
                           <FormGroup row>
                                <Label htmlFor="title" md={2}>Title</Label>
                                <Col md={10}>
                                    <Input type="title" name="title"
                                        placeholder="Title"
                                        value={this.state.title}
                                        valid={errors.title === ''}
                                        invalid={errors.title !== ''}
                                        onBlur={this.handleBlur('title')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.title}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="body" md={2}>Body</Label>
                                <Col md={10}>
                                    <Input type="body" name="body"
                                        placeholder="Body"
                                        value={this.state.body}
                                        valid={errors.body === ''}
                                        invalid={errors.body !== ''}
                                        onBlur={this.handleBlur('body')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.body}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md={{size: 10, offset: 2}}> 
                                    <Button onClick={this.props.closeForm}>
                                        Close Form
                                     </Button>
                                </Col>     
                            </FormGroup>
                           </Form> 
                        </div>
                    </div>
                   </div>
                </div>
             
        );
    }
}
export default FormControl;