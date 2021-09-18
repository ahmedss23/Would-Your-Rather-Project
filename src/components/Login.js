import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../styles/Login.css'

class Login extends Component {

    state = {
        selectedUser: ''
    }

    handleOnChange = (e)=>{
        e.preventDefault()
        const selectedUser = e.target.value
        this.setState({
            selectedUser
        })
    }

    handleOnClick = (e)=>{
        e.preventDefault()
        const { selectedUser } = this.state
        this.props.dispatch(setAuthedUser(selectedUser))
        return <Redirect to='/' />
    }

    render() {
        const { users, authedUser } = this.props
        if (authedUser) return <Redirect to='/' />
        return (
             <div className='login-panel'>
                 <div className='login-panel-top'>
                    <b>Welcome to Would Your Rather App!</b>
                    <br/>
                    <span>Please sign in to continue</span>
                 </div>
                 <div className='login-panel-bottom'>
                    <b>Sign in</b>
                    <select name='users' id='users' defaultValue='' onChange={this.handleOnChange}> 
                        <option value='' disabled hidden> Select User</option>
                        {
                            Object.keys(users).map(user=>(
                                <option key={user} value={user}>{users[user].name}</option>
                            ))
                        }
                    </select>
                    <button onClick={this.handleOnClick}>Sign in</button>
                 </div>
             </div>
        );
    }
}

function mapStateToProps({ users , authedUser}){
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Login)