import React from "react";
import users from "https://jsonplaceholder.typicode.com/users";

class list extends React.Component
{
    render()
    {
        return(
            <div>
                <select>
                    <option selected disabled="true">-- Select Country --</option>
                    {
                        users.map((result)=>(<option text={result.id}>{result.name}</option>))
                    }
                </select>
            </div>
        )
    }
}

export default list;

import React, { Component } from 'react'
import users from "https://jsonplaceholder.typicode.com/users"

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			errormsg: '',
			topic: 'react'
		}
	}

	handleUsernameChange = event => {
		this.setState({
			username: event.target.value
		})
	}

	handleErrormsgChange = event => {
		this.setState({
			errormsg: event.target.value
		})
	}

	handleTopicChange = event => {
		this.setState({
			topic: event.target.value
		})
	}

	handleSubmit = event => {
		alert(`${this.state.username} ${this.state.errormsg} ${this.state.topic}`)
		event.preventDefault()
	}

	render() {
		const { username, errormsg, topic } = this.state
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Username: </label>
					<input
						type="text"
						value={username}
						onChange={this.handleUsernameChange}
					/>
				</div>
				<div>
					<label>Error Message: </label>
					<textarea
						value={errormsg}
						onChange={this.handleErrormsgChange}
					/>
				</div>
				<div>
					<label>Topic</label>
					<select value={topic} onChange={this.handleTopicChange}>
						<option value="react">React</option>
						<option value="angular">Angular</option>
						<option value="vue">Vue</option>
					</select>
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default Form