import {
  GET_USERS,
  POST_DATA,
  SET_CURRENT,
  SET_ERROR,
  SUCCESS_MSG,
} from '../types';
const initialstate = {
  users: [],
  error: '',
  postSucccess: '',
  postData: {
    title: '',
    body: '',
    userId: '',
  },
  current: {},
};
export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case POST_DATA:
      return {
        ...state,
        postData: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SUCCESS_MSG:
      return {
        ...state,
        postSuccess: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
