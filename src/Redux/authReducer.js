// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActions';

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
