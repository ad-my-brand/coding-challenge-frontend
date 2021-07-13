import React, { useEffect, useState } from "react";
import axios from "axios";

export const FormControl = () => {
	const [users, setUsers] = useState([]);
	const [currUserID, setCurrUserID] = useState(null);
	const [title, setTitle] = useState(null);
	const [message, setMessage] = useState(null);
	const [isFieldEmpty, setIsFieldEmpty] = useState(false);
	const [isPostFailed, setIsPostFailed] = useState(false);
	const [isPostSuccess, setIsPostSuccess] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					"https://jsonplaceholder.typicode.com/users"
				);
				setUsers(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (currUserID && title && message) {
			try {
				await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
					title,
					body: message,
					userId: currUserID,
				});
				console.log(title, message, currUserID);
				setIsPostSuccess(true);

				setTimeout(() => {
					setIsPostSuccess(false);
					window.location.reload();
				}, 2000);
			} catch (error) {
				setIsPostFailed(true);
				setTimeout(() => {
					setIsPostFailed(false);
					window.location.reload();
				}, 2000);
			}
		} else if (!currUserID || !title || !message) {
			setIsFieldEmpty(true);
			console.log("errrrr");
			setTimeout(() => {
				setIsFieldEmpty(false);
				window.location.reload();
			}, 2000);
		}
	};
	return (
		<div className="form">
			<form>
				{isFieldEmpty && (
					<p className="message warning">Enter all text fields!!!</p>
				)}
				{isPostSuccess && (
					<p className="message success">Post saved Successfully</p>
				)}
				{isPostFailed && (
					<p className="message error">
						Something went wrong, please try again!!!
					</p>
				)}
				<div className="form-input">
					<label>User Name</label>
					<select
						className={isFieldEmpty ? "user-input empty" : "user-input"}
						onChange={(e) => {
							setCurrUserID(e.target.value);
						}}
					>
						<option disabled selected>
							-select-
						</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
					</select>
					<label>Title</label>
					<input
						className={isFieldEmpty ? "title-input empty" : "title-input"}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					></input>

					<label>Message</label>

					<textarea
						className={isFieldEmpty ? "message-input empty" : "message-input"}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					></textarea>

					<input type="submit" value="Submit" onClick={handleSubmit} />
				</div>
			</form>
		</div>
	);
};
