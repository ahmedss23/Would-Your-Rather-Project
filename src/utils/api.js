import {
    _getQuestions,
    _getUsers,
    _saveQuestionAnswer,
    _saveQuestion
} from './_DATA'

export function getInitialDataAPI () {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions])=>({
        users,
        questions
    }))
}

export function saveQuestionAPI (info) {
    return _saveQuestion(info)
}

export function saveQuestionAnswerAPI (info) {
    return _saveQuestionAnswer(info)
}