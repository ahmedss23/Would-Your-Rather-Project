import React , { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import '../styles/NavBar.css'


class NavBar extends Component {
    
    handleLogout=()=>{
        this.props.dispatch(setAuthedUser(''))
    }

    render(){
        const {
            authedUser,
            users,
            location
        } = this.props
        return (
            <nav className='nav'>
                <div>
                    <ul className="nav-links">
                        <NavLink to='/home'><li>Home</li></NavLink>
                        <NavLink to='/add'><li>New Question</li></NavLink>
                        <NavLink to='/leaderboard'><li>Leader Board</li></NavLink>
                    </ul>
                </div>
                <div className='nav-user-info'>
                {authedUser ?
                    <div>
                        <span>Hello, {users[authedUser].name}</span>
                        <button className="nav-btn" onClick={this.handleLogout}>Logout</button> 
                    </div>
                    :
                    <div>
                        {location.pathname !== '/login'
                            ?
                                (<button className='nav-btn'><NavLink to='/login'>Log in</NavLink></button>)
                            :
                                null
                        }
                    </div>}

                    
                </div>                    
            </nav>
        )
    }
}

function mapStateToProps ({ authedUser, users }){
    return {
        authedUser,
        users
    }
}
export default withRouter(connect(mapStateToProps)(NavBar))