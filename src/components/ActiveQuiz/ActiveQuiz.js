import React from 'react'
import clasess from './ActiveQuiz.module.sass'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
	return (
		<div className={clasess.ActiveQuiz}>
			<p className={clasess.Question}>
				<span>
					{/* <strong>2.</strong>&nbsp;
					{props.question} */}
					<strong>{props.question}</strong>
				</span>

				<small>{props.questionNumber}/{props.quizLength}</small>
			</p>
			<AnswersList answers={props.answers} onAnswerClick={props.onAnswerClick} answerState={props.answerState}/>
		</div>
	)
}

export default ActiveQuiz
