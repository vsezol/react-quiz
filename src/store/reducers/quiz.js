// в этом файле все редюсеры, которые связаны с тестом quiz

import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from '../actions/actionTypes'

// начальное состояние
const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null
}

// экспортируем quizReducer
// редюсер принимает предыдущее состояние (по дефолту это начальное состояние) и событие
export default (state = initialState, action) => {
  // используем switch для обработки событий
  switch (action.type) {
    // после старта получения запросов меняем поле загрузки на true
    case FETCH_QUIZES_START:
      return { ...state, loading: true }
    // в случае успеха = загрузка false и добавляются quizes(тесты)
    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.quizes }
    // в случае ошибки = загрузка false и добавляем ошибку
    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error }
    // удачное получение теста по id
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, quiz: action.quiz }
    // изменение state
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    // завершение теста
    case FINISH_QUIZ:
      return { ...state, isFinished: true }
    // по дефолту должен возвращать состояние
    case QUIZ_NEXT_QUESTION:
      return { ...state, answerState: null, activeQuestion: action.number}
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        isFinished: 0,
        answerState: null,
        results: {}
      }
    default:
      return state
  }
}
