import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionPoll from './QuestionPoll'

class Root extends Component {
    state = {
        question: null
    }

    componentDidMount(){
        this.setState({
            question: null
        })
        const {
            users,
            questions,
            authedUser
        } = this.props
        const answeredQuestions = Object.keys(users[authedUser].answers)
        let unansweredQuestions = []
        Object.keys(questions).forEach(question=>{
            if(!answeredQuestions.includes(question)) unansweredQuestions.push(question)
        })
        unansweredQuestions = unansweredQuestions.sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
        this.setState({
            question: unansweredQuestions[0]
        })
    }

    render(){
        const { authedUser } = this.props
        if (!authedUser) return <Redirect to='/login' />
        return (
            <div>
                {this.state.question && <QuestionPoll qid={this.state.question}/>}
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