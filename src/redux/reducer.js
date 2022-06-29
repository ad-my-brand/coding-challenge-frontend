import { SET_USERS } from "./actionType";

let initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      let data = action.payload.userData;
      return {
        ...state,
        allUsers: data,
      };
    default:
      return state;
  }
};
export default userReducer;
