export const RECEIVE_USERS = "RECEIVE_USERS"
export const CHANGE_ANSWER = "CHANGE_ANSWER"

export function receiveUsers (users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function changeAnswer ({ authedUser, qid, answer}){
    return {
        type: CHANGE_ANSWER,
        authedUser,
        qid,
        answer
    }
}