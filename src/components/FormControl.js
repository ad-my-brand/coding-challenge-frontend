const FormControl = ({ name, setName }) => {
	return (
		<div className="heading">
			<form>
				<input
					type="text"
					placeholder="Name"
					value={name}
					className="form__input"
					onChange={(e) => setName(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default FormControl;
