import axios from 'axios';
import { useEffect, useState } from 'react';
import Cards from './components/Cards';
import FormControl from './components/FormControl';

export const url = 'https://jsonplaceholder.typicode.com/users';
function App() {
	const [data, setData] = useState([]);
	const [name, setName] = useState('');

	const handleData = async () => {
		try {
			const resp = await axios.get(url);
			const newData = resp.data;

			setData(newData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleData();
	}, []);

	return (
		<div className="main-container">
			<FormControl name={name} setName={setName} />
			<Cards data={data} name={name} />
		</div>
	);
}

export default App;
