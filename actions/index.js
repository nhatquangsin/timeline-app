// import { query } from '../services/api';
import { ENDPOINTS, METHODS } from '../constants/api';

export const ADD_ACTIVITY = 'add activity';
export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';
export const LOGOUT = 'logout';

export function addActivity(data) {
  return {
    type: ADD_ACTIVITY,
    payload: data,
  };
}

export function authFacebook(data, callback) {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      callback.success();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      // const result = await query({
      //   data,
      //   endpoint: ENDPOINTS.authFacebook,
      //   method: METHODS.post,
      // });
      // if (result.status === 200) {
      //   callback.success();
      //   dispatch({
      //     type: LOGIN_SUCCESS,
      //     payload: result.data,
      //   });
      // } else {
      //   callback.failure();
      //   dispatch({
      //     type: LOGIN_FAILURE,
      //   });
      // }
    } catch (error) {
      callback.failure();
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
    }
  };
}

export function logout(callback) {
  callback.success();
  return {
    type: LOGOUT,
  };
}
