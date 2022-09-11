import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
    FormControl Component can have multiple arguments which include :
        label : A label for the input
        type : input type (accepts standart html types)
        validator : A function which will run to validate the input
        changeFunc : A function which runs onChange 
        placeholder : placeholder text for the input
        required : is the input required
        options : if type is select then the following options
*/
const FormControl = ({
	type = 'text',
	label = 'Label',
	name = '',
	id = '',
	validator = () => ({
		isValid: true,
		message: '',
	}),
	changeFunc = () => {},
	placeholder = '',
	required = false,
	options = [],
	onBlur = validator,
	...otherProps
}) => {
	const changeHandler = (e) => {
		changeFunc(e);
	};
	const blurHandler = (e) => {
		const { isValid, message } = validator(e.target.value);
		if (!isValid) {
			setLvalid(false);
			setError(message);
			return;
		} else {
			setLvalid(true);
			setError(false);
		}
		changeFunc(e);
	};
	const [lvalid, setLvalid] = useState(false);
	id = id ? id : name;
	const defaultProps = {
		name,
		id,
		type,
		onChange: changeHandler,
		onBlur: blurHandler,
		placeholder,
		required,
		'data-valid': lvalid,
		...otherProps,
	};

	const inputElement = (() => {
		if (type === 'select') {
			return (
				<select
					className="py-2 px-4 rounded-md border-2 border-gray-400"
					{...defaultProps}
					defaultValue=""
				>
					<option value="" disabled>
						Select user
					</option>
					{options.map((op) => (
						<option key={op.id} value={op.value}>
							{op.name}
						</option>
					))}
				</select>
			);
		} else if (type === 'textarea') {
			return (
				<textarea
					className="border-gray-400 border-2 px-4 py-2 rounded-md"
					{...defaultProps}
					cols="30"
					rows="5"
				></textarea>
			);
		} else if (type === 'submit' || type === 'reset ') {
			return (
				<input
					className="bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus:border-blue-900 focus:border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
					{...defaultProps}
					type={type}
					value={name}
				/>
			);
		} else {
			return (
				<input
					className="border-gray-400 border-2 px-4 py-2 rounded-md"
					{...defaultProps}
				/>
			);
		}
	})();

	const [error, setError] = useState(false);
	return (
		<div className="">
			{label ? (
				<>
					<label className="inline-block my-2" htmlFor={id}>
						{label}{' '}
						{required ? (
							<span className="text-red-500">*</span>
						) : (
							''
						)}
					</label>
					<br />
				</>
			) : (
				''
			)}

			{inputElement}
			<br />
			<p className="text-red-500">{error ? error : ''}</p>
		</div>
	);
};

const inputTypes = [
	'checkbox',
	'color',
	'date',
	'datetime-local',
	'email',
	'file',
	'hidden',
	'image',
	'month',
	'number',
	'password',
	'radio',
	'range',
	'reset',
	'search',
	'tel',
	'text',
	'time',
	'url',
	'week',
	'select',
	'textarea',
	'submit',
];

// defining prop types so that invalid props can be detected easily

FormControl.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	type: PropTypes.oneOf(inputTypes),
	validator: PropTypes.func,
	changeHandler: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object),
};

export default FormControl;
