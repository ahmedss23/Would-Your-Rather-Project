import React , { Component } from 'react'
import { connect } from 'react-redux'
import UserData from './UserData'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    render(){
        const {
            users,
            authedUser
        } = this.props

        if (!authedUser) return <Redirect to={{
            pathname: '/login',
            state: { lastLocation: '/leaderboard'}
        }} />

        const sortedUsers = Object.keys(users).sort((a,b)=>{
            let userAA = Object.keys(users[a].answers).length
            let userAU = users[a].questions.length
            let userAS = userAA + userAU
            let userBA = Object.keys(users[b].answers).length
            let userBU = users[b].questions.length
            let userBS = userBA + userBU
            return ( userBS - userAS )
        })

        return(
            <div className='leaderboard'>
                {sortedUsers.map(id=>(
                    <UserData key={id} id={id}/>
                ))}
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

export default connect(mapStateToProps)(LeaderBoard)