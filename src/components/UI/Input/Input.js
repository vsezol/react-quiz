import React from 'react'
import classes from './Input.module.sass'

const isInvalid = ({ valid, touched, shouldValidate }) => {
	return !valid && shouldValidate && touched
}

const Input = props => {
	const inputType = props.type || 'text'
	const cls = [classes.Input]
	const htmlFor = `${inputType}-${Math.round(Math.random() * 1000)}`
	if (isInvalid(props)) {
		cls.push(classes.invalid)
	}
	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>
				{props.label}
				{isInvalid(props) ? (
					<span>{props.errorMessage || ': incorrect value'}</span>
				) : null}
			</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	)
}

export default Input
