import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  userId: null,
  email: null,
  token: null,
  houseName: null,
  houseId: null,
  expiration: null,
};

const authUser = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    token: action.token,
    email: action.email,
    expiration: action.expiration,
  });
};

const authHouse = (state, action) => {
  return updateObject(state, {
    token: action.token,
    houseName: action.houseName,
    houseId: action.houseId,
    expiration: action.expiration,
  });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return authUser(state, action);
    case actionTypes.AUTH_HOUSE:
      return authHouse(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default authReducer;
