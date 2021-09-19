import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionPoll from './QuestionPoll'

class Root extends Component {
    state = {
        questions: []
    }

    componentDidMount(){
        this.setState({
            questions: []
        })
        const {
            users,
            questions,
            authedUser
        } = this.props

        if(!authedUser)    return null
        const answeredQuestions = Object.keys(users[authedUser].answers)
        let unansweredQuestions = []
        Object.keys(questions).forEach(question=>{
            if(!answeredQuestions.includes(question)) unansweredQuestions.push(question)
        })
        unansweredQuestions = unansweredQuestions.sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
        console.log(unansweredQuestions)
        this.setState({
            questions: unansweredQuestions
        })
    }

    render(){
        const { authedUser } = this.props
        const { questions } = this.state
        console.log(questions)
        if (!authedUser) return <Redirect to='/login' />
        return (
            <div>
                {questions && questions.map( id => <QuestionPoll qid={id}/>)}
            </div>
        )
    }
}

function mapStateToProps ({users, questions, authedUser}){
    return {
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Root)