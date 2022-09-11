import { Alert, CircularProgress, Snackbar } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import FormControl from '../components/FormControl';
const MyMapView = dynamic(() => import('../components/Map'), {
	ssr: false,
});
const Form = () => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [openErr, setOpenErr] = useState(false);
	const defaultErrorMessage = 'An Error Occured!';
	const [error, setError] = useState(defaultErrorMessage);
	const [openWarn, setOpenWarn] = useState(false);
	const [warn, setWarn] = useState('Not submitted due to improper input.');

	const [valid, setValid] = useState(false); // can submit the form?

	const [coords, setCoords] = useState({
		mapLongitude: 0.0,
		mapLatitude: 0.0,
	});
	const handleClose = () => {
		setOpen(false);
	};
	const handleCloseErr = () => {
		setOpenErr(false);
	};
	const handleCloseWarn = () => {
		setOpenWarn(false);
	};
	useEffect(() => {
		setLoading(true);
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((data) => {
				setUsers(
					data.map((user) => ({
						id: user.id,
						name: user.name,
						value: user.id,
					}))
				);
				setLoading(false);
			})
			.catch((err) => {
				if (err.message) setError(err.message);
				else setError('Error while fetching data');

				setOpenErr(true);
				setLoading(false);
			});
	}, []);

	const validateUser = (val) => {
		if (!val) {
			return {
				isValid: false,
				message: 'Please select an user',
			};
		}
		return {
			isValid: true,
			message: '',
		};
	};

	const validateTitle = (val) => {
		if (val.length < 3) {
			return {
				isValid: false,
				message: 'Title should be atleast 3 characters long',
			};
		}
		return {
			isValid: true,
			message: '',
		};
	};

	const validateDescription = (val) => {
		if (val.split(' ').length < 3) {
			return {
				isValid: false,
				message: 'Description should be atleast 3 words long',
			};
		}
		return {
			isValid: true,
			message: '',
		};
	};

	const postData = async (e) => {
		e.preventDefault();
		console.log(e.target.elements);
		try {
			for (let key in e.target.elements) {
				const { dataset } = e.target.elements[key];
				if (dataset && JSON.parse(dataset?.valid) == false) {
					setWarn(`Invalid input ${e.target.elements[key].name}`);
					setValid(false);
					return setOpenWarn(true);
				}
			}
		} catch (err) {
			alert(
				'Error Validating data, please make sure name attribute exists'
			);
		}
		setValid(true);
		const uid = e.target['users'].value;
		const title = e.target['title'].value;
		const desc = e.target['description'].value;

		try {
			const resp = await fetch(
				'https://jsonplaceholder.typicode.com/users/',
				{
					method: 'POST',
					body: { userId: uid, title, body: desc },
				}
			);
			if (resp.ok) {
				setOpen(true);
			} else {
				throw new Error('Error while saving data');
			}
		} catch (err) {
			setError('Network Error while saving data');
			setOpenErr(true);
		}
	};

	const updateCoords = async (e) => {
		const uid = e.target.value;
		let res;
		try {
			res = await fetch(
				`https://jsonplaceholder.typicode.com/users/${uid}`
			);
		} catch (err) {
			setError('Error fetching coordinates');
			setOpenErr(true);
			return;
		}
		const data = await res.json();
		console.log(data);
		const { lat, lng } = data.address.geo;
		setCoords({ mapLatitude: lat, mapLongitude: lng });
	};

	if (loading) {
		return (
			<div className="p-10 bg-gray-10 rounded">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="bg-gray-100 shadow-md rounded p-8 m-8 ">
			<h2 className="text-2xl font-bold text-center m-2">Users Form</h2>
			<div className="flex justify-evenly flex-wrap form-container">
				<MyMapView className="focus:border-2 " coords={coords} />

				<form className="flex flex-col gap-2" onSubmit={postData}>
					<FormControl
						label="Users"
						name="users"
						id="users"
						type="select"
						options={users}
						onChange={updateCoords}
						// required={true}
						validator={validateUser}
					/>
					<FormControl
						label="Title"
						type="text"
						name="title"
						id="title"
						placeholder="Enter Title"
						required={true}
						validator={validateTitle}
					/>

					<FormControl
						type="textarea"
						name="description"
						id="description"
						label="Description"
						placeholder="Enter Description"
						required={true}
						validator={validateDescription}
					/>

					<FormControl
						type="submit"
						name="Submit"
						value="Submit"
						label={false}
					/>
				</form>

				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: '100%' }}
					>
						Data Saved
					</Alert>
				</Snackbar>

				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={openErr}
					autoHideDuration={6000}
					onClose={handleCloseErr}
				>
					<Alert severity="error">{error}</Alert>
				</Snackbar>

				<Snackbar
					open={openWarn}
					autoHideDuration={6000}
					onClose={handleCloseWarn}
				>
					<Alert
						onClose={handleCloseWarn}
						severity="warning"
						sx={{ width: '100%' }}
					>
						{warn}
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
};

export default Form;
