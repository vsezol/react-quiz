import React, { Component } from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null, // {id: success error}
		quiz: [
			{
				question: 'Какой длины у тебя волосня на жопке?',
				rightAnswerId: 4,
				id: 1,
				answers: [
					{ text: '0 см', id: 1 },
					{ text: 'до 1 см', id: 2 },
					{ text: '1-5 см', id: 3 },
					{ text: 'Я тян пруфiв не будет', id: 4 }
				]
			},
			{
				question: 'Какой ник самый оптимальный для игры minecraft?',
				rightAnswerId: 2,
				id: 2,
				answers: [
					{ text: 'opa_chin_chopa', id: 1 },
					{ text: 'popajopa', id: 2 },
					{ text: 'zhmih', id: 3 },
					{ text: 'pizdolaz', id: 4 }
				]
			},
			{
				question: 'Что было раньше, курица или яйка?',
				rightAnswerId: 3,
				id: 3,
				answers: [
					{ text: 'курица', id: 1 },
					{ text: '1.5 курицы', id: 2 },
					{ text: 'vsezol', id: 3 },
					{ text: '1.5 яйки', id: 4 }
				]
			}
		]
	}

	onAnswerClickHandler = answerId => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}

		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
				console.log(results)
			}
			this.setState({
				answerState: { [answerId]: 'success' },
				results
			})
			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				clearTimeout(timeout)
			}, 1000)
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: { [answerId]: 'error' },
				results
			})
		}
	}

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			isFinished: 0,
			answerState: null,
			results: {}
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Quizer</h1>
					{this.state.isFinished ? (
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						/>
					) : (
						<ActiveQuiz
							question={
								this.state.quiz[this.state.activeQuestion]
									.question
							}
							answers={
								this.state.quiz[this.state.activeQuestion]
									.answers
							}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							questionNumber={this.state.activeQuestion + 1}
							answerState={this.state.answerState}
						/>
					)}
				</div>
			</div>
		)
	}
}

export default Quiz
