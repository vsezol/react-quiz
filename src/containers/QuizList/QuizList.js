import React, { Component } from 'react'
import classes from './QuizList.module.sass'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
	renderQuizes() {
		return this.props.quizes.map(quiz => (
			<li key={quiz.id}>
				<NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
			</li>
		))
	}

	componentDidMount() {
		this.props.fetchQuizes()
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Quiz list</h1>
					{this.props.loading && this.props.quizes.length !== 0 ? (
						<Loader />
					) : (
						<ul>{this.renderQuizes()}</ul>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
