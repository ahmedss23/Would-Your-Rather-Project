import React , { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/UserData.css'

class UserData extends Component {
    render(){
        const {
            users,
            authedUser,
            id
        } = this.props
        const userName = users[id].name
        const userPic = users[id].avatarURL
        const answeredQuestions = Object.keys(users[id].answers).length
        const createdQuestions = users[id].questions.length
        const score = answeredQuestions + createdQuestions
        return(
            <div className='userdata-user-info'>
                <div>
                    <img src={userPic} alt={`${userName} pic`} className='userdata-user-image'/>
                </div>
                <div className='userdata-user-info-top'>
                    <b>{userName}</b>
                    {
                        (authedUser === id) && <span> (YOU)</span>
                    }
                    <br/>
                    <pre>Answered Question         {answeredQuestions}</pre>
                    <pre>Created Questions         {createdQuestions}</pre>
                </div>
                <div className='userdata-user-info-bottom'>
                    <div className='score-top'>
                        <span>Score</span>
                    </div>
                    <div>
                        <center>{score}</center>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }){
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(UserData)