import React, { Component } from 'react'
import classes from './QuizList.module.sass'
import { NavLink } from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends Component {
	state = {
		quizes: [],
		loading: true,
		isEmpty: false
	}

	renderQuizes() {
		return this.state.quizes.map(quiz => (
			<li key={quiz.id}>
				<NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
			</li>
		))
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/quizes.json')
			const quizes = []
			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Test № ${index + 1}`
				})
			})
			this.setState({ quizes, loading: false, isEmpty: false })
		} catch (e) {
			this.setState({ loading: false, isEmpty: true })
		}
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Quiz list</h1>
					{this.state.isEmpty ? (
						<h2 className={classes.error}>The list is empty</h2>
					) : null}
					{this.state.loading ? (
						<Loader />
					) : (
						<ul>{this.renderQuizes()}</ul>
					)}
				</div>
			</div>
		)
	}
}

export default QuizList
