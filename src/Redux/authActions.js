// authActions.js
import { auth } from "../FireBase/config";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});
export const asyncLogout = () => {
  return async (dispatch) => {
    try {
      await auth.signOut();
      localStorage.removeItem('userId');
      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
};