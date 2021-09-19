import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class NotFound extends Component {
    render() {
        const { authedUser } = this.props
        if (!authedUser) return <Redirect to={{ pathname:'/login', state: {lastLocation: '/404'}}}/>
        return (
            <div>
                <h1>Not Found</h1>
            </div>
        )
    }
}

function mapStateToProps({ authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NotFound)