// импортируем axios
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

export function fetchQuizes() {
  // промежуточный обработчик перехватывает посылку
  return async dispatch => {
    console.log(dispatch)
    // вызываем создатель события старта получения тестов
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
      // вызываем создатель события удачного завершения получения тестов
      // передаем также полученные тесты
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      // если ошибка вызываем создателя ошибки
      dispatch(fetchQuizesError(e))
    }
  }
}
// ACTION CREATORS
// каждый создатель события должен возвращать тип (type)

// создатель события начала получения тестов
export function fetchQuizesStart() {
  return { type: FETCH_QUIZES_START }
}

// создатель события удачного получения тестов
export function fetchQuizesSuccess(quizes) {
  // возвращает payload = quizes
  return { type: FETCH_QUIZES_SUCCESS, quizes }
}

// создатель события неудачного получения тестов
export function fetchQuizesError(e) {
  // возвращает payload = error
  return { type: FETCH_QUIZES_ERROR, error: e }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
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

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizAnswerClick(answerId) {
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
