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
				question: 'Какой длины у тебя хохоряшки?',
				rightAnswerId: 4,
				id: 1,
				answers: [
					{ text: '0 см', id: 1 },
					{ text: 'до 1 см', id: 2 },
					{ text: '1-5 см', id: 3 },
					{ text: 'Я тян пруфiв не будет', id: 4 },
				],
			},
			{
				question: 'Выберете наилучший игровой ник',
				rightAnswerId: 2,
				id: 2,
				answers: [
					{ text: 'opa_chin_chopa', id: 1 },
					{ text: 'popajopa', id: 2 },
					{ text: 'zhmih', id: 3 },
					{ text: 'pizdolaz', id: 4 },
				],
			},
			{
				question:
					'Ты упал в яму. В яме пирожок и хуй. Что съешь, что в жопу засунешь?',
				rightAnswerId: 2,
				id: 3,
				answers: [
					{
						text:
							'Жопу пирожком закрою, а хуй в рот не стану брать',
						id: 1,
					},
					{ text: 'Возьму пирожок и вылезу из ямы', id: 2 },
					{ text: 'Из каждой ямы можно вылезти', id: 3 },
					{ text: 'Конечно хуек в рот, а пирог в жопу', id: 4 },
				],
			},
			{
				question: 'Что было раньше, курица или vsezol?',
				rightAnswerId: 3,
				id: 4,
				answers: [
					{ text: 'курица', id: 1 },
					{ text: '1.5 курицы', id: 2 },
					{ text: 'vsezol', id: 3 },
					{ text: 'яйцо', id: 4 },
				],
			},
			{
				question:
					'Рядом два стула, на одном пики точеные, на другом хуи дроченые, куда сам сядешь, куда мать посадишь?',
				rightAnswerId: 2,
				id: 5,
				answers: [
					{ text: 'хуи - мать, пики - я', id: 1 },
					{ text: 'блять', id: 2 },
					{ text: 'хуи - я, пики - мать', id: 3 },
					{
						text: 'Возьму пики точеные, да срублю хуи дроченые',
						id: 4,
					},
				],
			},
			{
				question: 'Ведьмаку заплатите ... (продолжите фразу)',
				rightAnswerId: 4,
				id: 6,
				answers: [
					{ text: 'фальшивой монетой', id: 1 },
					{ text: 'ничего', id: 2 },
					{ text: 'чеканой копейкой', id: 3 },
					{ text: 'three hundred bucks', id: 4 },
				],
			},
			{
				question:
					'Minecraft, ЕГЭ, Программирование, Дроч (уберите лишнее слово)',
				rightAnswerId: 1,
				id: 7,
				answers: [
					{ text: 'ЕГЭ', id: 1 },
					{ text: 'Дроч', id: 2 },
					{ text: 'Программирование', id: 3 },
					{ text: 'Minecraft', id: 4 },
				],
			},
			{
				question: 'Почему у человека грустное ебало?',
				rightAnswerId: 3,
				id: 8,
				answers: [
					{ text: 'Я че ебу?', id: 1 },
					{ text: 'Потому что', id: 2 },
					{ text: 'Хочет срать, но дальше курит', id: 3 },
					{ text: 'Ударился членом об шкаф', id: 4 },
				],
			},
		],
	}

	onAnswerClickHandler = (answerId) => {
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
				results,
			})
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: { [answerId]: 'error' },
				results,
			})
		}
		const timeout = setTimeout(() => {
			if (this.isQuizFinished()) {
				this.setState({
					isFinished: true,
				})
			} else {
				this.setState({
					activeQuestion: this.state.activeQuestion + 1,
					answerState: null,
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
			results: {},
		})
	}

	componentDidMount() {
		console.log(`Quiz id = ${this.props.match.params.id}`)
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
