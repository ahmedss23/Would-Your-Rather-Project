import { getInitialDataAPI } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = ''

export default function handleInitialData() {
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialDataAPI()
        .then(({users , questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}