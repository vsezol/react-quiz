import React, { Component } from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null, // {id: success error}
		quiz: [],
		loading: true
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
			}
			this.setState({
				answerState: { [answerId]: 'success' },
				results
			})
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: { [answerId]: 'error' },
				results
			})
		}
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

	async componentDidMount() {
		try {
			const response = await axios.get(
				`/quizes/${this.props.match.params.id}.json`
			)
			const quiz = response.data
			this.setState({
				quiz,
				loading: false
			})
		} catch (e) {}
		console.log(`Quiz id = ${this.props.match.params.id}`)
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Quizer</h1>
					{this.state.loading ? (
						<Loader />
					) : this.state.isFinished ? (
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
					{/* {this.state.isFinished ? (
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
					)} */}
				</div>
			</div>
		)
	}
}

export default Quiz
