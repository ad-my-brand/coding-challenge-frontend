import React, { Component } from 'react'
import axios from 'axios'
class PostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userId: '',
			title: '',
			body: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {

		e.preventDefault()
    if(this.state.userId.length==0)alert('Please Enter a User')
		console.log(this.state)
		axios
			.post('https://jsonplaceholder.typicode.com/posts', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { userId, title, body } = this.state
		return (
			<div className='form-box'>
				<form onSubmit={this.submitHandler}>
					<div>
            <label>User Name : </label>
						<input
							type="text"
							name="userId"
							value={userId}
              placeholder='Enter user name'
							onChange={this.changeHandler}
						/>
					</div>
					<div>
          <label>Title : </label>
						<input
							type="text"
							name="title"
							value={title}
              placeholder='Enter Title'
							onChange={this.changeHandler}
						/>
					</div>
					<div>
          <label>Body : </label>
						<input
							type="text"
							name="body"
							value={body}
              placeholder='Enter Body'
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default PostForm