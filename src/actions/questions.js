import { saveQuestionAPI, saveQuestionAnswerAPI } from '../utils/api'
import { showLoading, hideLoading } from "react-redux-loading"
import { changeAnswer } from './users'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const SAVE_QUESTION = "SAVE_QUESTION"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"
export function receiveQuestions (questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestion (question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

function saveQuestionAnswer ({authedUser, qid, answer}) {
        return {
            type: SAVE_QUESTION_ANSWER,
            authedUser,
            qid,
            answer
        }
}

export function handleSaveQuestion({optionOneText,optionTwoText}) {
    return (dispatch, getState )=>{
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestionAPI({
            author: authedUser,
            optionOneText,
            optionTwoText
        }).then((question)=>dispatch(saveQuestion(question)))
        .then(()=>dispatch(hideLoading()))
        .catch(()=>alert('Failed to add your question!'))
    }
}

export function handleSaveQuestionAnswer({qid, answer}) {
    return (dispatch,getState) =>{
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestionAnswerAPI({
            authedUser,
            qid,
            answer
        }).then(dispatch(saveQuestionAnswer({authedUser, qid, answer})))
        .then(dispatch(changeAnswer({authedUser, qid, answer})))
        .then(dispatch(hideLoading()))
    }
}