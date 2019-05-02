import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  isLogging: false,
  error: null,
  info: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogging: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLogging: false,
        error: null,
        info: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLogging: false,
        error: action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
