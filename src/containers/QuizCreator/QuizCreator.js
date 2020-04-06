import React, { Component } from 'react'
import classes from './QuizCreator.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControl } from '../../form/FormFramework'

function* createOptionControl() {
	for (let i = 1; i <= 10; i++) {
		yield createControl(
			{
				label: `variant ${i}`,
				errorMessage: 'The value should not be empty!',
				id: i
			},
			{ required: true }
		)
	}
}

const createFormControls = () => {
	const optionControlGen = createOptionControl()
	return {
		question: createControl(
			{
				label: 'Enter the question',
				errorMessage: 'The question should not be empty!'
			},
			{
				required: true
			}
		),
		options: [
			optionControlGen.next(),
			optionControlGen.next(),
			optionControlGen.next(),
			optionControlGen.next()
		]
	}
}

class QuizCreator extends Component {
	state = {
		quiz: [],
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	submitHandler = event => event.preventDefault()

	addQuestionHandler = () => {}

	createQuizHandler = () => {}

	changeQuestionHandler = event => {}

	changeOptionHandler = (event, index) => {}

	changeSelectHandler = event => {
		this.setState({rightAnswerId: +event.target.value})
	}

	renderQuestion = () => {
		const question = this.state.formControls.question
		return (
			<Input
				label={question.label}
				value={question.value}
				valid={question.valid}
				shouldValidate={!!question.validation}
				touched={question.touched}
				errorMessage={question.errorMessage}
				onChange={event => this.changeQuestionHandler(event)}
			/>
		)
	}

	renderOptions = () =>
		this.state.formControls.options.map((control, index) => {
			control = control.value
			return (
				<Input
					key={index}
					label={control.label}
					value={control.value}
					valid={control.valid}
					shouldValidate={!!control.validation}
					touched={control.touched}
					errorMessage={control.errorMessage}
					onChange={event => this.changeOptionHandler(event, index)}
				/>
			)
		})

	render() {
		const select = (
			<Select
				label="Choose right answer"
				value={this.state.rightAnswerId}
				onChange={this.changeSelectHandler}
				options={this.state.formControls.options.map(option => {
					return { text: option.value.id, value: option.value.value }
				})}
			/>
		)

		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>QuizCreator</h1>
					<form onSubmit={this.submitHandler}></form>
					{this.renderQuestion()}
					<hr />
					{this.renderOptions()}
					<hr />
					{select}
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
