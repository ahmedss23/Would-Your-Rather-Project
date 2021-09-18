import React , { Component } from 'react'
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions'
import { Redirect, withRouter } from 'react-router-dom'
import '../styles/NewQuestion.css'

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: ''
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {
            history,
            dispatch
        } = this.props
        dispatch(handleSaveQuestion(this.state))
        .then(()=>history.push('/'))
    }

    handleChange = (e)=>{
        e.preventDefault()
        const option = e.target.name
        const value = e.target.value
        this.setState({
            [option]: value
        })
    }

    render() {
        const {
            optionOne,
            optionTwo
        } = this.state

        const { authedUser } = this.props

        if (!authedUser) return <Redirect to='/login' />

        return (
             <div className='new-question'>
                 <div className='new-question-top'>
                    <h3>Create New Question</h3>
                 </div>
                 <div className='new-question-bottom'>
                     <h5>Complete the question:</h5>
                     <b>Would you rather ...</b>
                     <form className='new-question-form' onSubmit={this.handleSubmit}>
                         <input type='text' name='optionOneText' placeholder='Enter Option One Text Here' value={optionOne} onChange={this.handleChange}/>
                         <h2><span>OR</span></h2>
                         <input type='text' name='optionTwoText' placeholder='Enter Option Two Text Here' value={optionTwo} onChange={this.handleChange}/>
                         <input type='submit' />
                     </form>
                 </div>
             </div>
        );
    }
}

function mapStateToProps({ authedUser }){
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))