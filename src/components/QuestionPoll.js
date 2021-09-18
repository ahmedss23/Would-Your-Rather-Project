import React , { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import '../styles/QuestionPoll.css'

class QuestionPoll extends Component {
    
    state={
        answer: ''
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const answer = this.state.answer
        if(!answer) return null
        const {
            qid,
            dispatch,
            history,
        } = this.props;
        dispatch(handleSaveQuestionAnswer({qid, answer}))
        history.push(`/question/${qid}`)

    }

    handleChange = (e)=>{
        this.setState({
            answer: e.target.value
        })
    }

    render(){
        const {
            qid,
            users,
            questions
        } = this.props
        const question = questions[qid]
        const authorName = users[question.author].name
        const authorPic = users[question.author].avatarURL
        return (
            <div className='question'>
                <div className='question-top'>
                    <h3>{`${authorName} asks:`}</h3>
                </div>
                <div className='question-bottom'>
                    <div className='question-image-div'>
                        <img src={authorPic} className='question-image'alt={`${authorName} pic`}/>
                    </div>
                    <div>
                        <h2>Would You Rather ...</h2>
                        <form className="question-form" onSubmit={this.handleSubmit}>
                            <input type='radio' value='optionOne' name='answer' onChange={this.handleChange}/>
                            <label> {question.optionOne.text} </label>
                            <br />
                            <input type='radio' value='optionTwo' name='answer' onChange={this.handleChange}/>
                            <label> {question.optionTwo.text} </label>
                            <br />
                            <input type='submit'/>
                        </form>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps)(QuestionPoll))