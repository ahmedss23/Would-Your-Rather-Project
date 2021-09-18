import React , { Component } from 'react'
import { connect } from 'react-redux'
import UserData from './UserData'

class LeaderBoard extends Component {
    render(){
        const {
            users
        } = this.props

        //sort data by score

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

function mapStateToProps({ users }){
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)