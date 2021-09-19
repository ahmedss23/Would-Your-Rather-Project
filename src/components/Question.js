import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionPoll from './QuestionPoll'
import QuestionResults from './QuestionResults'
import { Redirect } from 'react-router-dom'

class Question extends Component {
    render(){
        const {
            authedUser,
            users,
            questions,
            id
        } = this.props
        if (!Object.keys(questions).includes(id)) return <Redirect to={{ pathname:'/404' , state:{ lastLocation: '/404'}}} />
        if (!authedUser) return <Redirect to={{ pathname:'/login' , state: { lastLocation: `/question/${id}`}}} />
        const answeredQuestion = Object.keys(users[authedUser].answers)
        const answered = answeredQuestion.includes(id)

        return (
            <Fragment>
                {answered ?
                    <QuestionResults id={id} /> :
                    <QuestionPoll qid={id} />
                }
            </Fragment>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props){
    const id = props.match.params.id
    return {
        authedUser,
        users,
        questions,
        id
    }
}

export default connect(mapStateToProps)(Question)