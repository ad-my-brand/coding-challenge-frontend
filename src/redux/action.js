import { SET_USERS } from "./actionType";

export const setUsers = (userData) => async (dispatch) => {
  dispatch({
    type: SET_USERS,
    payload: {
      userData: userData,
    },
  });
};
