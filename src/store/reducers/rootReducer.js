// данная функция собирает все редюсеры в один объект
import { combineReducers } from 'redux'
// подключаем редюсер, который отвечает за тест quiz
import quizReducer from './quiz'

// по дефолту экспортируем главный редюсер
export default combineReducers({
    quiz: quizReducer
})
