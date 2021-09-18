import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionView extends Component {

    render(){
        const {
            id,
            users,
            questions
        } = this.props
        const question = questions[id]
        const authorName = users[question.author].name
        const authorPic = users[question.author].avatarURL
        return (
            <div className='question-view'>
                <div className='question-view-top'>
                    <h3>{`${authorName} asks:`}</h3>
                </div>
                <div className='question-view-bottom'>
                    <div className='question-view-image-div'>
                        <img src={authorPic} className='question-view-image'alt={`${authorName} pic`}/>
                    </div>
                    <div>
                        <h2>Would You Rather ...</h2>
                        <b> {question.optionOne.text} </b>
                        <br />
                        <b> {question.optionTwo.text} </b>
                        <br />
                        <Link to={`/question/${id}`}><button>View Poll</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions}){
    return {
        users,
        questions
    }
}

export default connect(mapStateToProps)(QuestionView)