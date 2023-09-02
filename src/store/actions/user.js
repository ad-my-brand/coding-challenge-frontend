import userApi from '../../api/userApi'
import { FETCH_USER, POST_FAILED, POST_SUCCESS, REMOVE_ALERT } from '../types'


export const fetchUser = () => async dispatch => {
    try {
        const response = await userApi.get('/users')
        dispatch({ type: FETCH_USER, payload: response?.data })
    } catch (err) {
        console.error("Something went wrong");
    }
}

export const postUser = (title, body, userId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const jsonBody = JSON.stringify({ title, body, userId })
    try {
        await userApi.post('/posts', jsonBody, config)
        dispatch({ type: POST_SUCCESS })
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT })
        }, 3500);
    } catch (err) {
        dispatch({ type: POST_FAILED })
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT })
        }, 3500);
    }
}