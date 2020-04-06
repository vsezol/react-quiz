import React from 'react'
import classes from './Select.module.sass'

const Select = props => {
	const htmlFor = `${props.label}-${Math.round(Math.random() * 1000)}`
	return (
		<div className={classes.Select}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<select id={htmlFor} value={props.value} onChange={props.onChange}>
				{props.options.map((option, index) => (
					<option value={option.value} key={index}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select
