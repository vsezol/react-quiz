// файл с константами типов событий

// константы для событий по получению тестов
export const FETCH_QUIZES_START = 'FETCH_QUIZES_START'
export const FETCH_QUIZES_SUCCESS = 'FETCH_QUIZES_SUCCESS'
export const FETCH_QUIZES_ERROR = 'FETCH_QUIZES_ERROR'

// получение теста по id 
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS'
// измененение state
export const QUIZ_SET_STATE = 'QUIZ_SET_STATE'
// завершение теста
export const FINISH_QUIZ = 'FINISH_QUIZ'
// следующий тест
export const QUIZ_NEXT_QUESTION = 'QUIZ_NEXT_QUESTION'
// попробовать пройти тест заново
export const QUIZ_RETRY = 'QUIZ_RETRY'