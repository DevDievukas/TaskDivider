import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../Utility';


const initialState = {
  valid: false,
  username: null,
  photo: `https://image.flaticon.com/icons/svg/892/892781.svg`,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    username: action.userName,
    photo: action.photoURL,
    valid: true,
  });
};

const logout = (state) => {
  localStorage.clear();
  return updateObject(state, {
    username: null,
    valid: false,
    photo: `https://image.flaticon.com/icons/svg/892/892781.svg`,
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};
