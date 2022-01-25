// import React from "react";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const FormComponent = ({ label, formType, validation, onchange, value }) => {
	if (formType.options) console.log(formType.options);

	const [selectValue, setSelectValue] = useState();

	return (
		<div className='input-container'>
			<label> {label} </label>
			<div className='input_box'>
				{formType.type === "select" ? (
					<select
						name='user'
						id='user'
						value={selectValue}
						// value={optionsState}
						onChange={(e) => {
							setSelectValue(e.target.value);
							onchange(e.target.value);
						}}
					>
						<option key={"0"} name='name'>
							Select User
						</option>
						{formType.options &&
							formType.options.map((option, index) => {
								return (
									<>
										<option
											key={index}
											value={option.userId}
										>
											{option.user}
										</option>
									</>
								);
							})}
					</select>
				) : (
					<></>
				)}

				{formType.type === "text" ? (
					<>
						<input
							placeholder={label}
							type='text'
							onChange={(e) => onchange(e.target.value)}
							value={value}
						/>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default FormComponent;
