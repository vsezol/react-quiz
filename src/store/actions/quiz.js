import axios from '../../axios/axios-quiz'
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZ_SUCCESS
} from './actionTypes'


export const fetchQuizesStart = () => {
	return {
		type: FETCH_QUIZES_START
	}
}

export const fetchQuizesSuccess = quizes => {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes
	}
}

export const fetchQuizSuccess = quiz => {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export const fetchQuizes = () => {
	return async dispatch => {
		console.log(dispatch)
		dispatch(fetchQuizesStart())
		try {
			const response = await axios.get('/quizes.json')
			const quizes = []
			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Test № ${index + 1}`
				})
			})
			dispatch(fetchQuizesSuccess(quizes))
		} catch (e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export const fetchQuizesError = e => {
	return {
		type: FETCH_QUIZES_ERROR,
		error: e
	}
}

export const fetchQuizById = quizId => async dispatch => {
	dispatch(fetchQuizesStart())
	try {
		const response = await axios.get(
			`/quizes/${quizId}.json`
		)
		const quiz = response.data
		dispatch(fetchQuizSuccess(quiz))
	} catch (e) {
		dispatch(fetchQuizesError(e))
	}
}
