import axios from 'axios';
import React, { useState } from 'react';

import Map from './Map';

const Card = ({ name, address, search, id }) => {
	const postUrl = 'https://jsonplaceholder.typicode.com/post';

	const geo = address?.geo && address.geo;

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [httpError, sethttpError] = useState({
		error: false,
		message: '',
	});

	const handleChange = (e) => {
		setSuccess(false);
		setError(false);
		if (e.target.name === 'title') {
			setTitle(e.target.value);
		} else {
			setBody(e.target.value);
		}
	};
	const submit = async () => {
		try {
			const resp = await axios.post(postUrl, {
				title,
				body,
				userid: id,
			});
			console.log(resp);
		} catch (error) {
			console.log(error.message);
			sethttpError((oldState) => {
				return { ...oldState, error: true, message: error.message };
			});
			window.alert(`${error.message}, try again later`);
			window.location.reload(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !body) {
			setError(true);
			return;
		}

		submit();

		setSuccess(true);
		if (search) {
			setTimeout(() => {
				window.location.reload(true);
			}, 3000);
		}
	};

	return (
		<div className="card " data-testid={`card-item-${id}`}>
			<h2>{name}</h2>
			{geo !== undefined && <Map geo={geo} />}
			<form className="form-card">
				<input
					placeholder="Title"
					type="text"
					value={title}
					name="title"
					onChange={handleChange}
				/>
				<input
					placeholder="body"
					type="text"
					value={body}
					name="body"
					onChange={handleChange}
				/>
				<button className="form-button" type="click" onClick={handleSubmit}>
					submit
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>please fill all values</p>}
			{success && <p style={{ color: 'green' }}>Submited!</p>}
		</div>
	);
};

export default Card;
