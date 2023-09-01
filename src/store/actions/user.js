import userApi from '../../api/userApi'
import { FETCH_USER, POST_FAILED, POST_SUCCESS, REMOVE_ALERT } from '../types'


export const fetchUser = () => async dispatch => {
    try {
        const response = await userApi.get('/users')
        dispatch({ type: FETCH_USER, payload: response?.data })
    } catch (err) {
        const errors = err?.response?.data?.errors
        console.error(errors);
    }
}

export const postUser = (title, body, userId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const jsonBody = JSON.stringify({ title, body, userId })
    console.log(jsonBody);
    try {
        await userApi.post('/posts', jsonBody, config)
        dispatch({ type: POST_SUCCESS })
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT })
        }, 3500);
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({ type: POST_FAILED })
        console.error(errors);
    }
}