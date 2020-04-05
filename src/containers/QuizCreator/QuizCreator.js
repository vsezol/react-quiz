import React, { Component } from 'react'
import classes from './QuizCreator.module.sass'
import Button from '../../components/UI/Button/Button'

class QuizCreator extends Component {
	submitHandler = event => event.preventDefault()

	addQuestionHandler = () => {}

	createQuizHandler = () => {}

	render() {
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>QuizCreator</h1>
					<form onSubmit={this.submitHandler}></form>

					<input />
					<hr />
					<input />
					<input />
					<input />
					<select></select>
					<Button type="primary" onClick={this.addQuestionHandler}>
						Add Question
					</Button>
					<Button type="success" onClick={this.createQuizHandler}>
						Create Quiz
					</Button>
				</div>
			</div>
		)
	}
}

export default QuizCreator
