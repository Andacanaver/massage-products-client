import React from 'react'

export default function TypeSearch(props) {
    return (
		<>
			<input
				type="radio"
				onChange={e => props.setType(e.target.value)}
				id={props.type}
				name="type"
				value={props.type}
			/>
			<label htmlFor={props.type}>{props.type}</label>
		</>
	);
}