import React, { Component } from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: ': incorrect email',
				valid: false,
				touched: false,
				shouldValidate: true,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Password',
				errorMessage: ': incorrect password',
				valid: false,
				touched: false,
				shouldValidate: true,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALhYgxXNylty1biVjDhcPnEHDTM3fmNag',
				authData
			)
			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	registerHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALhYgxXNylty1biVjDhcPnEHDTM3fmNag',
				authData
			)
			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	submitHandler = event => event.preventDefault()

	validateControl = (value, validation) => {
		if (!validation) return true
		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email) {
			isValid = is.email(value) && isValid
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		return isValid
	}

	onChangeHandler = (event, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }
		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)
		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({ formControls, isFormValid })
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map(
			(controlName, index) => {
				const control = this.state.formControls[controlName]
				return (
					<Input
						key={controlName + index}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						label={control.label}
						shouldValidate={!!control.shouldValidate}
						errorMessage={control.errorMessage}
						onChange={event =>
							this.onChangeHandler(event, controlName)
						}
					/>
				)
			}
		)
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Authorization</h1>
					<form
						onSubmit={this.submitHandler}
						className={classes.AuthForm}
					>
						<div>{this.renderInputs()}</div>
						<div className={classes.buttonDiv}>
							<Button
								type="success"
								onClick={this.loginHandler}
								disabled={!this.state.isFormValid}
							>
								Sign in
							</Button>
							<Button
								type="primary"
								onClick={this.registerHandler}
							>
								Sign up
							</Button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Auth
