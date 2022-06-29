import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducer";

const appReducer = combineReducers({
  user: userReducer,
});

export const reducer = (state, action) => {
  return appReducer(state, action);
};
