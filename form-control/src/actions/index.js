import {
  GET_USERS,
  POST_DATA,
  SET_CURRENT,
  SET_ERROR,
  SUCCESS_MSG,
} from '../types';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    setError(
      'Unable retrieve data from the API.Please check your Internet Connection.'
    );
  }
};

export const addPost = (data) => async (dispatch) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resdata = await res.json();
    console.log('Success', resdata);
    dispatch({
      type: POST_DATA,
      payload: resdata,
    });
  } catch (err) {
    setError(`${err}`);
  }
};
export const setCurrent = (data) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${data}`
    );
    dispatch({
      type: SET_CURRENT,
      payload: {
        latitiude: parseFloat(res.data.address.geo.lat),
        longitude: parseFloat(res.data.address.geo.lng),
      },
    });
  } catch (err) {
    setError(
      'Unable retrieve data from the API.Please check your Internet Connection.'
    );
  }
};
export const setError = (data) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: data,
  });
  setTimeout(() => {
    dispatch({
      type: SET_ERROR,
      payload: '',
    });
  }, 3000);
};
export const successMsg = (data) => (dispatch) => {
  dispatch({
    type: SUCCESS_MSG,
    payload: data,
  });
  setTimeout(() => {
    dispatch({
      type: SUCCESS_MSG,
      payload: '',
    });
  }, 5000);
};
