import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			errormsg: '',
            isLoaded: false
		}

        if(localStorage.getItem('formData')){
            this.state = JSON.parse(localStorage.getItem('formData'));
        }else{
            this.state={
                ID: ''
            }
        }
        this.handleIDChange = this.handleIDChange.bind(this);
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

    handleIDChange = event => {
		this.setState({
			ID: event.target.value,
            latitude1: this.ID.geo.lat,
            longitude1: this.ID.geo.lng
		}, () => {
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
	}

	 componentDidMount() {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json
            })
        });
     }
	

	handleSubmit = event => {
		alert(`${this.state.username} ${this.state.errormsg} ${this.state.ID} ${this.state.latitude1}`)
		event.preventDefault()
	}

	render() {
		const { username, errormsg, topic } = this.state
        var { isLoaded, items } = this.state;
        
        if (!isLoaded){
            return <div>Loading... </div>
        }
        else{
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
					<label>User Name:</label>
					<select onChange={this.handleIDChange}>
                    <option selected disabled="true">-- Select Username --</option>
                    {
                        items.map((item) => (<option value={item.id} >{item.name}</option>))
                    }
                    </select>
				</div>
				<button type="submit">Submit</button>
                <div>
                    <Map google={this.props.google} zoom={14}>
                        
                    <Marker position={this.latitude1 ,this.longitude1} />
                            
                    <InfoWindow onClose={this.InfoWindowClose}>

                    </InfoWindow>
                    </Map>
                </div>
			</form>
		)}
                }        


            }
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDloZ2b4GQMufdCq3-Rar_9kPOclSbsJiY")
})(Form)