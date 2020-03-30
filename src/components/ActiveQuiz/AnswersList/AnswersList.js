import React from 'react'
import classes from './AnswersList.module.sass'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
	return (
		<ul className={classes.AnswersList}>
			{props.answers.map((answer, index) => (
				<AnswerItem
					key={index}
					answer={answer}
					onAnswerClick={props.onAnswerClick}
					answerState={props.answerState ? props.answerState[answer.id] : null}
				/>
			))}
		</ul>
	)
}

export default AnswersList
