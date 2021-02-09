import * as actionTypes from './actionTypes';

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const userAuth = (id, token, email) => {
  return {
    type: actionTypes.AUTH_USER,
    userId: id,
    token: token,
    email: email,
  };
};

export const houseAuth = (id, token, houseName) => {
  return {
    type: actionTypes.AUTH_HOUSE,
    houseId: id,
    token: token,
    houseName: houseName,
  };
};

export const startUserAuth = (id, token, email) => {
  return (dispatch) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        email: email,
        token: token,
      })
    );
    dispatch(userAuth(id, token, email));
  };
};

export const startHouseAuth = (id, token, houseName) => {
  return (dispatch) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        houseId: id,
        token: token,
        houseName: houseName,
      })
    );
    dispatch(houseAuth(id, token, houseName));
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(logout());
  };
};
