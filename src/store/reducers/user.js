import { FETCH_USER, POST_FAILED, POST_SUCCESS, REMOVE_ALERT } from "../types"

const initialState = {
    loading: true,
    msg: [],
    users: []
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case FETCH_USER:
            return {
                ...state,
                loading: false,
                users: payload
            }
        case POST_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: ["Posted Successfully", false]
            }
        case POST_FAILED:
            return {
                ...state,
                loading: false,
                msg: ["Post Unsuccessful", true]
            }
        case REMOVE_ALERT:
            return {
                ...state,
                msg: []
            }
        default:
            return state
    }
}