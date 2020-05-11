// ФАЙЛ С СОЗДАТЕЛЯМИ СОБЫТИЙ

// импортируем axios
import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes'

// ASYNC Action Creators

// получение тестов
export function fetchQuizes() {
  // промежуточный обработчик перехватывает посылку
  return async dispatch => {
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

// получение теста
export function fetchQuizById(quizId) {
  // промежуточный обработчик перехватывает посылку
  return async dispatch => {
    // вызываем создатель события старта получения теста
    dispatch(fetchQuizesStart())
    try {
      // получаем ответ от Сервера
      const response = await axios.get(`/quizes/${quizId}.json`)
      // тест это данные из ответа
      const quiz = response.data
      // вызываем создатель события успешного получения теста
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      // диспатчим креэйтор ошибки
      dispatch(fetchQuizesError(e))
    }
  }
}

// обработка ответа
export function quizAnswerClick(answerId) {
  // redux-thunk добавляет ф getState для получения state
  return (dispatch, getState) => {
    // получаем state и забираем поле quiz за которое отвечает редюсер тестов
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
      if (isQuizFinished(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1))
      }
      clearTimeout(timeout)
    }, 1000)
  }
}

// ф определяет, завершен ли тест
function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

// ACTION CREATORS
// каждый создатель события должен возвращать тип (type)

// получение СПИСКА тестов

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

// получение КОНКРЕТНОГО теста по id
export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

// изменение state
export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}
// завершение теста
export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

// следующий вопрос
// передаем номер следующего вопроса
export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}