import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ
} from './actionTypes'
import AnswerItem from '../../components/ActiveQuiz/AnswersList/AnswerItem/AnswerItem'

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
    const response = await axios.get(`/quizes/${quizId}.json`)
    const quiz = response.data
    dispatch(fetchQuizSuccess(quiz))
  } catch (e) {
    dispatch(fetchQuizesError(e))
  }
}

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  }
}

export const quizAnswerClick = answerId => {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results))
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({ [answerId]: 'error' }, results))
    }
    const timeout = setTimeout(() => {
      if (this.isQuizFinished()) {
        dispatch(finishQuiz)
        // this.setState({
        //   isFinished: true
        // })
      } else {
        // this.setState({
        //   activeQuestion: state.activeQuestion + 1,
        //   answerState: null
        // })
      }
      clearTimeout(timeout)
    }, 1000)
  }
}
