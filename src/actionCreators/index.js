import api from '../api';
import { GET_DATA, MAKE_POST, ERR_GET_DATA, ERR_MAKE_POST } from './types';

export const fetchData = () => async dispatch => {
    await api.get(`/users`)
        .then(res => {
            dispatch({ type: GET_DATA, payload: res.data});
        }).catch(err => {
            dispatch({ type: ERR_GET_DATA, payload: err});
        });
}   

export const makePost = (post) => async dispatch => {
    await api.post(`/posts`,post)
        .then(res => {
            dispatch({ type: MAKE_POST, payload: res.data});
            alert('Post Added Successfully!');
        }).catch(err => {
            dispatch({ type: ERR_MAKE_POST, payload: err});
            alert('Post Failed!');
        });
}
    