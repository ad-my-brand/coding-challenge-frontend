import React, { Component } from "react";
import { connect } from "react-redux";

class FormControl extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: this.props.note[0],
      newNote: {
        title: this.props.note[1],
        body: this.props.note[2],
      },
      error: "",
    };
  }

  onChangeTitle(e) {
    const newTitle = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        title: newTitle,
      },
    }));
  }

  onChangeBody(e) {
    const newBody = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        body: newBody,
      },
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.FormControl(this.state.id, this.state.newNote);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>Edit your note</h1>
        <form onSubmit={this.onSubmit}>
          <label>Title</label>
          <input onChange={this.onChangeTitle} name="title" type="text" />
          <label>Note</label>
          <input onChange={this.onChangeBody} name="body" type="text" />
          <button>Update changes!</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  FormControl: (id, updates) => dispatch(FormControl(id, updates)),
});
/*constructor(props) {
    super(props);
    this.state = {
      value1: "shiya",
      value2: "abc@gmail.com",
      value3: 123,
      value4: 123,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const Email = target.Email;
    const Password = target.Password;

    this.setState({
      [name]: value,
      [Email]: value,
      [Password]: value,
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={this.state.value1}
          onChange={this.handleInputChange}
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={this.state.value2}
          onChange={this.handleChange}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          value={this.state.value3}
          onChange={this.handleChange}
        />
        <br />
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          value={this.state.value4}
          onChange={this.handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }*/
export default connect(null, mapDispatchToProps)(FormControl);
//export default FormControl;
