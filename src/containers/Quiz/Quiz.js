import React, { Component } from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById } from '../../store/actions/quiz'

class Quiz extends Component {
  onAnswerClickHandler = answerId => {
    
  }

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      isFinished: 0,
      answerState: null,
      results: {}
    })
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
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
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
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

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
  }
}

// подключаем редакс к компоненту
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
