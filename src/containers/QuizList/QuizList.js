import React, { Component } from 'react'
import classes from './QuizList.module.sass'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
// ф для подключения редакса к компоненту
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
	renderQuizes() {
		// теперь всегда обращаемся к пропсам а не к состоянию, потому что состояние из редакса передано в пропсы
		return this.props.quizes.map(quiz => (
			<li key={quiz.id}>
				<NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
			</li>
		))
	}

	componentDidMount() {
		// запуск загрузки тестов
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

// ф принимает состояние и пихает его в пропсы
const mapStateToProps = state => {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
}

// ф принимает диспатчи и пихает их в пропсы
const mapDispatchToProps = dispatch => {
	return {
		// данная функция отправляет создатель события на редюсер
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

// connect()() подключает redux к компоненту
export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
