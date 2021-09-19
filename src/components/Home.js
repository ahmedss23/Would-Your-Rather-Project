import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionView from './QuestionView'
import '../styles/Home.css'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    state = {
        showAnswered: false,
        answeredQuestions: [],
        unansweredQuestions: []

    }

    handleButtonClick = (e)=>{
        const { showAnswered } = this.state
        if (showAnswered===true){
            this.setState({
                showAnswered: false
            })
        }
        else {
            this.setState({
                showAnswered: true
            })
        }
    }

    componentDidMount(){
        const {
            users,
            questions,
            authedUser
        } = this.props
        if (authedUser === '') return null
        const answeredQuestions = Object.keys(users[authedUser].answers).sort((a,b)=> questions[b].timestamp - questions[a].timestamp)   
        const allQuestions = Object.keys(questions).sort((a,b)=> questions[b].timestamp - questions[a].timestamp)   
        let unansweredQuestions = []
        allQuestions.forEach(question=>{
            if(!answeredQuestions.includes(question))
            unansweredQuestions.push(question)
        })
        this.setState({
            answeredQuestions,
            unansweredQuestions
        })
    }

    render(){
        const { showAnswered,
            answeredQuestions,
            unansweredQuestions
        } = this.state
        const {
            authedUser
        } = this.props
        if (!authedUser) return <Redirect to={{ pathname:'/login' , state: { lastLocation: '/home'}}} />

        return (
            <div className='home'>
                <div className='home-top'>
                    <button disabled={!showAnswered} onClick={this.handleButtonClick}> Unanswered Question </button>
                    <button disabled={showAnswered} onClick={this.handleButtonClick}> Answered Question </button>
                </div>
                <div className='home-bottom'>
                        {showAnswered && answeredQuestions.map(id=>(
                            <QuestionView key={id} id={id}/>
                        ))}
                        {!showAnswered && unansweredQuestions.map(id=>(
                            <QuestionView key={id} id={id}/>
                        ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}){
    return {
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)