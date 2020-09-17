import * as actionTypes from './actionTypes';

export const authSuccess = (username, photo) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userName: username,
    photoURL: photo,
  };
};

export const auth = (username, photo) => {
  return authSuccess(username, photo);
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
