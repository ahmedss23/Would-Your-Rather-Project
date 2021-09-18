import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/QuestionResults.css'

class QuestionResults extends Component {
    render(){
        const {
            questions,
            users,
            authedUser,
            id
        } = this.props
        const question = questions[id]
        const authorName = users[question.author].name
        const authorPic = users[question.author].avatarURL
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOneVotesPerc = Math.round((optionOneVotes / totalVotes) * 100)
        const optionTwoVotesPerc = Math.round((optionTwoVotes / totalVotes) * 100)
        const authedUserVote = question.optionOne.votes.includes(authedUser) ? 'optionOne' : question.optionTwo.votes.includes(authedUser) ? 'optionTwo' : null
        return (
            <div className='question-results'>
                <div className='question-results-top'>
                    <h3>{`Asked by ${authorName}`}</h3>
                </div>
                <div className='question-results-bottom'>
                    <div className='question-results-image-div'>
                        <img src={authorPic} className='question-results-image'alt={`${authorName} pic`}/>
                    </div>
                    <div className='question-results-data'>
                        <h2> Results:</h2>
                        <div className={authedUserVote === 'optionOne' ? 'question-results-your-vote' : 'question-results-option'}>
                            <h3>Would you rather {question.optionOne.text}?</h3>
                            <progress value={optionOneVotesPerc} max='100' data-label={optionOneVotesPerc}/>
                            <center><b>{optionOneVotes} out of {totalVotes} votes</b></center>
                        </div>
                        <div className={authedUserVote === 'optionTwo' ? 'question-results-your-vote' : 'question-results-option'}>
                            <h3>Would you rather {question.optionTwo.text}?</h3>
                            <progress value={optionTwoVotesPerc} max='100' data-label={optionTwoVotesPerc}/>
                            <center><b>{optionTwoVotes} out of {totalVotes} votes</b></center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props){
    // const id = props.match.params.id
    const id = props.id
    return {
        authedUser,
        questions,
        users,
        id
    }
}

export default connect(mapStateToProps)(QuestionResults)