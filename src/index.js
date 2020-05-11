import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
// функция для создания хранилища / функция из ФП / функция принимает массив из промежуточных обработчиков
import { createStore, compose, applyMiddleware } from 'redux'
// для работы с асинхронными событиями
import thunk from 'redux-thunk'
// High Order Component для поддержки редакса
import { Provider } from 'react-redux'

// подключаем сюда главный редюсер
import rootReducer from './store/reducers/rootReducer'

// devTools для разработки
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

// создание хранилища: rootReducer / middlewares
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// в провайдер необходимо передать store
// в папке store находится все, что нужно редаксу
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
