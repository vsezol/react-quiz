import React from 'react'
import classes from './FinishedQuiz.module.sass'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') total++
		return total
	}, 0)

	return (
		<div className={classes.FinishedQuiz}>
			<h2>Спасибо, что потратили свое время на эту злоебучую херь!</h2>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						props.results[quizItem.id] === 'error'
							? 'fa-times ' + classes.error
							: 'fa-check ' + classes.success
					]

					return (
						<li key={index}>
							<strong>{index + 1}.</strong>&nbsp;
							{quizItem.question}
							<i className={cls.join(' ')} />
						</li>
					)
				})}
			</ul>
			<p>
				Правильно {successCount}/{props.quiz.length}
			</p>
			<div>
				<Button onClick={props.onRetry} type="primary">
					Повторить
				</Button>
				<Link to="/">
					<Button onClick={props.onRetry} type="success">
						Перейти в список тестов
					</Button>
				</Link>
			</div>
		</div>
	)
}
export default FinishedQuiz
