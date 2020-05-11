import React, { Component } from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {
  componentDidMount() {
    // получаем id из url и фетчим тест по этому id
    this.props.fetchQuizById(this.props.match.params.id)
  }

  // отчищаем state перед уничтожением компонента
  componentWillUnmount() {
    this.props.retryQuiz()
  }
  

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quizer</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              questionNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    )
  }
}

// state в props
const mapStateToProps = state => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

// dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    // ф для получения теста по id
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

// подключаем редакс к компоненту
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
