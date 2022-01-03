import { combineReducers } from 'redux';
import { GET_DATA, ERR_GET_DATA, MAKE_POST, ERR_MAKE_POST } from '../actionCreators/types';

const getData = (state = {} , action) => {
    switch(action.type) {
        case GET_DATA:
            return { error:false ,data: action.payload}
        case ERR_GET_DATA:
            return { error:true ,data: action.payload}
        default:
            return state
    }
};

const post = (state = {}, action) => {
    switch(action.type) {
        case MAKE_POST:
            return { error:false ,data: action.payload}
        case ERR_MAKE_POST:
            return { error:true ,data: action.payload}
        default:
            return state
    }
}

export default combineReducers({
    users: getData,
    post: post
});