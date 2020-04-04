import React, { Component } from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'

class Auth extends Component {
	loginHandler = () => {}

	registerHandler = () => {}

	submitHandler = event => event.preventDefault()

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Авторизация</h1>
					<form
						onSubmit={this.submitHandler}
						className={classes.AuthForm}
					>
						<div>
							<input type="text" />
							<input type="text" />
						</div>
						<div>
							<Button type="success" onClick={this.loginHandler}>
								Войти
							</Button>
							<Button
								type="primary"
								onClick={this.registerHandler}
							>
								Зарегистрироваться
							</Button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Auth
